import { Dispatch, SetStateAction } from 'react';

export interface InfoDialogProps {
  startCall: () => Promise<void>;
}

export interface InfoDialogContainerArgs {
  acceptRecording: boolean;
  actions: {
    setAcceptRecording: Dispatch<SetStateAction<boolean>>;
  };
}
