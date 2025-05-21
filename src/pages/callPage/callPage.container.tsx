import { ContainerWithProps } from '@/@common/types/container.type';
import { CallPageContainerArgs } from './callPage.types';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { PersonTypeEnum } from '@/utils/enums/personType.enum';
import { TranscriptionElement } from '@/components/ui/transcriptionCard/transcriptionCard.types';

export const CallPageContainer = (props: ContainerWithProps<CallPageContainerArgs>): React.JSX.Element => {
  const form = useForm();

  const playbackContextRef = useRef<AudioContext | null>(null);
  const nextPlaybackTimeRef = useRef<number>(0);

  const socketRef = useRef<WebSocket | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<string>('Aguardando');
  const [transcription, setTranscription] = useState<Array<TranscriptionElement>>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const transcriptedTextRef = useRef('');
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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

    source.onended = () => {
      setIsSpeaking(false);
    };
    nextPlaybackTimeRef.current = startAt + audioBuffer.duration;
  };

  const startCallText = async (): Promise<void> => {
    if (!playbackContextRef.current || playbackContextRef.current.state === 'closed') {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      nextPlaybackTimeRef.current = playbackContextRef.current.currentTime;
    }

    await SpeechRecognition.startListening({ continuous: true });

    const socket = new WebSocket(
      'ws://localhost:3001/ws?jobDescription=Engenheiro de Software&candidateName=Jessé&companyName=Workoast',
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket conectado');
      setCallStatus('Conectado, aguardando sessão da OpenAI...');
    };

    socket.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);
      console.log('📩 Mensagem recebida:', parsed);

      if (parsed.type === 'session.updated') {
        console.log('🟢 Sessão da OpenAI ativa, aguardando transcrição...');
        setIsRecording(true);
        setCallStatus('Gravando...');
      }

      if (parsed.type === 'response.audio.delta' && parsed.delta) {
        if (!isSpeaking) {
          setIsSpeaking(true);
        }
        playDelta(parsed.delta);
      }

      if (parsed.type === 'response.audio_transcript.done') {
        // setTranscription((prevState) => [
        //   ...prevState,
        //   <div className="w-[70%] flex gap-2 align-start align-self-start">
        //     <span>{'ENTREVISTADOR(A):'}</span>
        //     <TypeWriter text={parsed.transcript} delay={35} />
        //   </div>,
        // ]);

        setTranscription((prevState) => [
          ...prevState,
          { person: PersonTypeEnum.INTERVIEWER, transcript: parsed.transcript },
        ]);
      }

      if (parsed.type === 'response.create') {
        console.log('🗣️ Resposta:', parsed.message?.content);
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
    };
  };

  const stopCall = (): void => {
    playbackContextRef.current?.close();
    playbackContextRef.current = null;

    socketRef.current?.close();
    setIsRecording(false);
    setCallStatus('Chamada encerrada');
    setTranscription([]);
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    transcriptedTextRef.current = transcript;

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    silenceTimeoutRef.current = setTimeout(() => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && transcript.trim().length > 0) {
        socketRef.current.send(JSON.stringify({ transcript: transcript.trim() }));
        // setTranscription((prevState) => [
        //   ...prevState,
        //   <div className="w-[70%] flex gap-2 self-end justify-end pb-2">
        //     <span>{'USUÁRIO(A):'}</span>
        //     <TypeWriter text={transcript} delay={35} />
        //   </div>,
        // ]);
        setTranscription((prevState) => [...prevState, { person: PersonTypeEnum.INTERVIEWEE, transcript }]);
        resetTranscript();
      }
    }, 2000);

    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [transcript]);

  return props.children({
    form,
    isRecording,
    callStatus,
    transcription,
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isSpeaking,
    actions: {
      onSubmit,
      startCallText,
      stopCall,
    },
  });
};
