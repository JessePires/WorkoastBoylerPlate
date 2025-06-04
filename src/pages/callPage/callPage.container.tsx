import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX, useRef, useState } from 'react';

import { CallPageContainerArgs } from './callPage.types';
import { TranscriptionElement } from '@/components/ui/transcriptionCard/transcriptionCard.types';
import { PersonTypeEnum } from '@/utils/enums/personType.enum';
import { CallStatusEnum } from '@/utils/enums/callStatus.enum';

export const CallPageContainer = (props: ContainerWithProps<CallPageContainerArgs>): JSX.Element => {
  const playbackContextRef = useRef<AudioContext | null>(null);
  const nextPlaybackTimeRef = useRef<number>(0);

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<CallStatusEnum>(CallStatusEnum.WAITING);
  const [transcription, setTranscription] = useState<Array<TranscriptionElement>>([]);

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
    source.onended = () => {
      setIsSpeaking(false);
    };
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
      setCallStatus(CallStatusEnum.WAITING);
    };

    socket.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);

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
        setCallStatus(CallStatusEnum.CONNECTED);
      }

      if (parsed.type === 'response.audio.delta') {
        if (parsed.delta) {
          if (!isSpeaking) {
            setIsSpeaking(true);
          }
          playDelta(parsed.delta);
        }
      }

      if (parsed.type === 'response.audio_transcript.done') {
        setTranscription((prevState) => [
          ...prevState,
          { person: PersonTypeEnum.INTERVIEWER, transcript: parsed.transcript },
        ]);
      }

      if (parsed.type === 'conversation.item.input_audio_transcription.completed') {
        setTranscription((prevState) => [
          ...prevState,
          { person: PersonTypeEnum.INTERVIEWEE, transcript: parsed.transcript },
        ]);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket erro:', err);
      setCallStatus(CallStatusEnum.ERROR);
    };

    socket.onclose = () => {
      console.log('🔴 WebSocket desconectado');
      setIsRecording(false);
      setCallStatus(CallStatusEnum.DISCONNECTED);

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
    setCallStatus(CallStatusEnum.CALL_CLOSED);
    setTranscription([]);
  };

  return props.children({
    isRecording,
    callStatus,
    transcription,
    isSpeaking,
    actions: {
      startCall,
      stopCall,
    },
  });
};
