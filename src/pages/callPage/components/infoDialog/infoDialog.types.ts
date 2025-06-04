import { CallStatusEnum } from '@/utils/enums/callStatus.enum';
import { Dispatch, SetStateAction } from 'react';

export interface InfoDialogProps {
  startCall: () => Promise<void>;
  callStatus: CallStatusEnum;
}

export interface InfoDialogContainerArgs {
  acceptRecording: boolean;
  actions: {
    setAcceptRecording: Dispatch<SetStateAction<boolean>>;
  };
}
