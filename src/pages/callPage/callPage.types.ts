import { TranscriptionElement } from '@/components/ui/transcriptionCard/transcriptionCard.types';
import { CallStatusEnum } from '@/utils/enums/callStatus.enum';

export interface CallPageContainerArgs {
  isRecording: boolean;
  callStatus: CallStatusEnum;
  transcription: Array<TranscriptionElement>;
  isSpeaking: boolean;
  actions: {
    startCall: () => Promise<void>;
    stopCall: () => void;
  };
}
