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
import { useRef, useState } from 'react';

const floatTo16BitPCM = (float32Array: Float32Array): ArrayBuffer => {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
};

const CallPage = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Aguardando');

  const startCall = async () => {
    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(1024, 1, 1);
    processorRef.current = processor;

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

        processor.onaudioprocess = (e) => {
          const inputData = e.inputBuffer.getChannelData(0); // mono
          const pcmBuffer = floatTo16BitPCM(inputData);

          if (socket.readyState === WebSocket.OPEN) {
            socket.send(pcmBuffer);
          }
        };

        source.connect(processor);
        processor.connect(audioContext.destination); // ou dummy output

        setIsRecording(true);
        setStatus('Gravando...');
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
    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    socketRef.current?.close();

    setIsRecording(false);
    setStatus('Chamada encerrada');
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
    </div>
  );
};

export default CallPage;
