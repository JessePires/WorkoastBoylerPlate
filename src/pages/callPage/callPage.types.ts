import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface CallPageContainerArgs {
  form: UseFormReturn<FieldValues, any, undefined>;
  isRecording: boolean;
  callStatus: string;
  transcription: string;
  actions: {
    onSubmit: (data: FieldValues) => Promise<void>;
    startCall: () => Promise<void>;
    stopCall: () => void;
  };
}
