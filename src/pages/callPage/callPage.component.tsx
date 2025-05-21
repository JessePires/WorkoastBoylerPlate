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
import * as Containers from './callPage.container';
import { CallPageContainerArgs } from './callPage.types';
import TranscriptonCard from '@/components/ui/transcriptionCard/transcriptionCard.component';
import InfoDialog from './components/infoDialog/infoDialog.component';

import * as Icons from '../../assets/icons';

const CallPage = () => {
  return (
    <Containers.CallPageContainer>
      {(containerProps: CallPageContainerArgs): React.JSX.Element => {
        return (
          <div className="p-5 flex w-[100%] pt-13 justify-center gap-10">
            <div className="w-[45%]">
              <h1 className="text-2xl font-medium ml-2 pb-3">Chamada</h1>
              <div className="bg-white rounded-2xl shadow-sm h-[700px] flex flex-col justify-between items-center p-8">
                <div className="font-bold text-[20px]">Status: {containerProps.callStatus}</div>

                <div className="flex items-center justify-center h-[40px]">
                  {containerProps.callStatus === 'Gravando...' ? (
                    <div className="flex gap-1 items-end h-28">
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-100' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-300' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-200' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-500' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-400' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-100' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-300' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-200' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-500' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-400' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-100' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-300' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-200' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-500' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-400' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-100' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-300' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-200' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-500' : 'animate-none'}`}
                      />
                      <div
                        className={`w-1.5 h-full bg-primary ${containerProps.isSpeaking ? 'animate-wave animation-delay-400' : 'animate-none'}`}
                      />
                    </div>
                  ) : (
                    <Icons.MicOffIcon color="stroke-gray-300" width="180" height="180" />
                  )}
                </div>

                <div className="flex flex-row gap-4 h-">
                  <InfoDialog startCall={containerProps.actions.startCallText} />
                  <Button
                    variant="destructive"
                    onClick={containerProps.actions.stopCall}
                    disabled={!containerProps.isRecording}
                    className="w-50"
                  >
                    <Icons.PhoneCallOff color="stroke-white" />
                    <span>Encerrar Chamada</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-[45%]">
              <h1 className="text-2xl font-medium ml-2 pb-3">Transcrição</h1>

              <TranscriptonCard className="w-[100%] h-[700px] p-3" transcriptions={containerProps.transcription} />
            </div>

            <div>
              {!containerProps.browserSupportsSpeechRecognition && (
                <span>Browser doesn't support speech recognition.</span>
              )}
            </div>
          </div>
        );
      }}
    </Containers.CallPageContainer>
  );
};

export default CallPage;
