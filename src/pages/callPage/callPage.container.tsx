import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX, useRef, useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { CallPageContainerArgs } from './callPage.types';
import TypeWriter from '@/components/ui/typeWritter/typeWriter.component';
import { t } from 'i18next';

export const CallPageContainer = (props: ContainerWithProps<CallPageContainerArgs>): JSX.Element => {
  const form = useForm();

  const playbackContextRef = useRef<AudioContext | null>(null);
  const nextPlaybackTimeRef = useRef<number>(0);

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<string>('Aguardando');
  const [transcription, setTranscription] = useState<Array<React.JSX.Element>>([]);

  const onSubmit = async (data: FieldValues): Promise<void> => {};

  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const playDelta = (pcmBase64: string): void => {
    if (!pcmBase64) return;

    const playbackContext = playbackContextRef.current;
    if (!playbackContext) return;

    const buffer = base64ToArrayBuffer(pcmBase64);
    const int16Array = new Int16Array(buffer);
    const float32Array = new Float32Array(int16Array.length);

    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    const audioBuffer = playbackContext.createBuffer(1, float32Array.length, 24000);
    audioBuffer.copyToChannel(float32Array, 0);

    const source = playbackContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(playbackContext.destination);

    const now = playbackContext.currentTime;
    const startAt = Math.max(nextPlaybackTimeRef.current, now + 0.1);

    source.start(startAt);
    nextPlaybackTimeRef.current = startAt + audioBuffer.duration;
  };

  const startCall = async (): Promise<void> => {
    if (isRecording) return;

    playbackContextRef.current = new AudioContext({ sampleRate: 16000 });
    nextPlaybackTimeRef.current = playbackContextRef.current.currentTime;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;

    await audioContext.audioWorklet.addModule('/src/processor/pcmProcessor.js');

    const source = audioContext.createMediaStreamSource(stream);
    const pcmNode = new AudioWorkletNode(audioContext, 'pcm-processor');
    processorRef.current = pcmNode as any;

    const websocketSocketURL = `${import.meta.env.VITE_WEBSOCKET_VOICE_API_ROUTE}?jobDescription=Engenheiro de Software&candidateName=Jessé&companyName=Workoast&language=pt`;
    const socket = new WebSocket(websocketSocketURL);
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket conectado');
      setCallStatus('Conectado, aguardando sessão da OpenAI...');
    };

    socket.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);
      console.log('📩 Mensagem recebida:', parsed);

      if (parsed.type === 'session.updated') {
        console.log('🟢 Sessão da OpenAI ativa, iniciando transmissão de áudio');

        pcmNode.port.onmessage = (event) => {
          const pcmBuffer = event.data;
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(pcmBuffer);
          }
        };

        source.connect(pcmNode);
        pcmNode.connect(audioContext.destination);

        setIsRecording(true);
        setCallStatus('Gravando...');
      }

      if (parsed.type === 'response.audio.delta') {
        if (parsed.delta) {
          playDelta(parsed.delta);
        }
      }

      if (parsed.type === 'response.audio_transcript.done') {
        setTranscription((prevState) => [
          ...prevState,
          <div className="w-[70%] flex gap-2 align-start align-self-start">
            <span>{t('callPage.transcriptionCard.peopleInvolved.interviwer')}</span>
            <TypeWriter text={parsed.transcript} delay={35} />
          </div>,
        ]);
      }

      if (parsed.type === 'response.create') {
        console.log('🗣️ Resposta:', parsed.message?.content);
      }

      if (parsed.type === 'conversation.item.input_audio_transcription.completed') {
        setTranscription((prevState) => [
          ...prevState,
          <div className="w-[70%] flex gap-2 self-end justify-end">
            <span>{t('callPage.transcriptionCard.peopleInvolved.you')}</span>
            <TypeWriter text={parsed.transcript} delay={35} />
          </div>,
        ]);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket erro:', err);
      setCallStatus('Erro');
    };

    socket.onclose = () => {
      console.log('🔴 WebSocket desconectado');
      setIsRecording(false);
      setCallStatus('Desconectado');

      processorRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  };

  const stopCall = (): void => {
    playbackContextRef.current?.close();
    playbackContextRef.current = null;

    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    socketRef.current?.close();

    setIsRecording(false);
    setCallStatus('Chamada encerrada');
    setTranscription([]);
  };

  return props.children({
    form,
    isRecording,
    callStatus,
    transcription,
    actions: {
      onSubmit,
      startCall,
      stopCall,
    },
  });
};
