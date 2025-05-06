// const CallPage = (): JSX.Element => {
// return (
//   <Containers.CallPageContainer>
//     {(containerProps: CallPageContainerArgs): JSX.Element => {
//       return (
//         <div className={callPageStyle.container}>
//           <h1 className={callPageStyle.title}>{t('callPage.pageTitle', { callName: 'Call Q4' })}</h1>
//           <h2 className={callPageStyle.subtitle}>{t('callPage.pageSubtitle')}</h2>

//           <div className={callPageStyle.cardsContainer}>
//             <CustomCard
//               cardStyle="w-[35%]"
//               header={<h1 className={callPageStyle.cardsTitle}>{t('callPage.promptCard.title')}</h1>}
//             >
//               <div className="w-[100%]">
//                 <Divider className="bg-gray-300" />
//                 <Form {...containerProps.form}>
//                   <form
//                     onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
//                     className={callPageStyle.form}
//                   >
//                     <FormField
//                       control={containerProps.form.control}
//                       name="name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className={callPageStyle.formLabels}>
//                             {t('callPage.promptCard.formLabels.name')}
//                           </FormLabel>
//                           <FormControl className="w-[100%]">
//                             <Input className="h-10" {...containerProps.form.register('name')} {...field} />
//                           </FormControl>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={containerProps.form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem className="w-[100%]">
//                           <FormLabel className={callPageStyle.formLabels}>
//                             {t('callPage.promptCard.formLabels.phone')}
//                           </FormLabel>
//                           <FormControl>
//                             <Input className="h-10" {...containerProps.form.register('phone')} {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={containerProps.form.control}
//                       name="prompt"
//                       render={({ field }) => (
//                         <FormItem className="w-[100%]">
//                           <FormLabel className={callPageStyle.formLabels}>
//                             {t('callPage.promptCard.formLabels.prompt')}
//                           </FormLabel>
//                           <FormControl>
//                             <Textarea
//                               className="h-60"
//                               cols={30}
//                               {...containerProps.form.register('prompt')}
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <div className={callPageStyle.buttonsContainer}>
//                       <Button variant="outline">{t('callPage.promptCard.buttons.cancel')}</Button>

//                       <Button type="submit" className="bg-green-500">
//                         {t('callPage.promptCard.buttons.startCall')}
//                       </Button>
//                     </div>
//                   </form>
//                 </Form>
//               </div>
//             </CustomCard>

//             <CustomCard
//               cardStyle="w-[35%]"
//               header={<h1 className={callPageStyle.cardsTitle}>{t('callPage.transcriptionCard.title')}</h1>}
//             >
//               <div>
//                 <Divider className="bg-gray-300" />

//                 <Form {...containerProps.form}>
//                   <form
//                     onSubmit={containerProps.form.handleSubmit(containerProps.actions.onSubmit)}
//                     className={callPageStyle.form}
//                   >
//                     <FormField
//                       control={containerProps.form.control}
//                       name="transcription"
//                       render={({ field }) => (
//                         <FormItem className="w-[100%] flex flex-col items-center">
//                           <FormLabel className="text-gray-500">
//                             {t('callPage.transcriptionCard.formLabels.transcription')}
//                           </FormLabel>
//                           <FormControl>
//                             <Textarea
//                               {...containerProps.form.register('transcription')}
//                               {...field}
//                               className="h-105"
//                               rows={60}
//                             />
//                           </FormControl>

//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <div className="flex justify-end">
//                       <Button className="bg-green-500">{t('callPage.transcriptionCard.buttons.finishCall')}</Button>
//                     </div>
//                   </form>
//                 </Form>
//               </div>
//             </CustomCard>
//           </div>
//         </div>
//       );
//     }}
//   </Containers.CallPageContainer>
// );

import { Button } from '@/components/ui/button';
import TypeWriter from '@/components/ui/typeWritter/typeWriter.component';
import { useRef, useState } from 'react';

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

const CallPage = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Aguardando');
  const [transcription, setTranscription] = useState<string>('');

  const playbackContextRef = useRef<AudioContext | null>(null);
  const nextPlaybackTimeRef = useRef<number>(0);

  const playDelta = (pcmBase64: string) => {
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

  const startCall = async () => {
    if (isRecording) return;

    playbackContextRef.current = new AudioContext({ sampleRate: 16000 });
    nextPlaybackTimeRef.current = playbackContextRef.current.currentTime;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;

    await audioContext.audioWorklet.addModule('/src/processor/pcmProcessor.js');

    const source = audioContext.createMediaStreamSource(stream);
    const pcmNode = new AudioWorkletNode(audioContext, 'pcm-processor');
    processorRef.current = pcmNode as any;

    const socket = new WebSocket('ws://localhost:3001/ws');
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket conectado');
      setStatus('Conectado, aguardando sessão da OpenAI...');
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
        setStatus('Gravando...');
      }

      if (parsed.type === 'response.audio.delta') {
        if (parsed.delta) {
          playDelta(parsed.delta);
        }
      }

      if (parsed.type === 'response.audio_transcript.done') {
        setTranscription((prevState) => `${prevState} ${parsed.transcript}`);
      }

      if (parsed.type === 'response.create') {
        console.log('🗣️ Resposta:', parsed.message?.content);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket erro:', err);
      setStatus('Erro');
    };

    socket.onclose = () => {
      console.log('🔴 WebSocket desconectado');
      setIsRecording(false);
      setStatus('Desconectado');

      processorRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  };

  const stopCall = () => {
    playbackContextRef.current?.close();
    playbackContextRef.current = null;

    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    socketRef.current?.close();

    setIsRecording(false);
    setStatus('Chamada encerrada');
    setTranscription('');
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={startCall} disabled={isRecording}>
        {isRecording ? 'Chamando...' : 'Iniciar Chamada'}
      </Button>
      {isRecording && (
        <Button variant="destructive" onClick={stopCall}>
          Encerrar Chamada
        </Button>
      )}
      <div>Status: {status}</div>

      <div className="pt-5">
        <h1 className="text-xl font-bold">Transcrição</h1>
        <TypeWriter text={transcription} delay={35} />
      </div>
    </div>
  );
};

export default CallPage;
