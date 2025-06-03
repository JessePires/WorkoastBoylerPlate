import { Button } from '@/components/ui/button';
import * as Containers from './callPage.container';
import { CallPageContainerArgs } from './callPage.types';
import { t } from 'i18next';
import * as Icons from '../../assets/icons';
import InfoDialog from './components/infoDialog/infoDialog.component';
import IaVisualStatus from './components/iaVisualStatus/iaVisualStatus.component';
import { CallStatusEnumLabel } from '@/utils/enums/callStatus.enum';
import TranscriptonCard from '@/components/ui/transcriptionCard/transcriptionCard.component';

const CallPage = () => {
  return (
    <Containers.CallPageContainer>
      {(containerProps: CallPageContainerArgs): React.JSX.Element => {
        return (
          <div className="p-5 flex w-[100%] pt-13 justify-center gap-10">
            <div className="w-[45%]">
              <h1 className="text-2xl font-medium ml-2 pb-3">{t('callPage.callCard.title')}</h1>
              <div className="bg-white rounded-2xl shadow-sm h-[700px] flex flex-col justify-between items-center p-8">
                <div className="font-bold text-[20px]">{`${t('callPage.callStatus.title')}: ${t(CallStatusEnumLabel[containerProps.callStatus])}`}</div>

                <div className="flex items-center justify-center h-[40px]">
                  <IaVisualStatus callStatus={containerProps.callStatus} isSpeaking={containerProps.isSpeaking} />
                </div>

                <div className="flex flex-row gap-4 h-">
                  <InfoDialog startCall={containerProps.actions.startCall} callStatus={containerProps.callStatus} />
                  <Button
                    variant="destructive"
                    onClick={containerProps.actions.stopCall}
                    disabled={!containerProps.isRecording}
                    className="w-50"
                  >
                    <Icons.PhoneCallOff color="stroke-white" />
                    <span>{t('callPage.callCard.endCall')}</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-[45%]">
              <h1 className="text-2xl font-medium ml-2 pb-3">{t('callPage.transcriptionCard.title')}</h1>

              <TranscriptonCard className="w-[100%] h-[700px] p-3" transcriptions={containerProps.transcription} />
            </div>
          </div>
        );
      }}
    </Containers.CallPageContainer>
  );
};

export default CallPage;
