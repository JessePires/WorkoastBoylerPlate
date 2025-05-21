import { TranscriptionElement } from '@/components/ui/transcriptionCard/transcriptionCard.types';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface CallPageContainerArgs {
  form: UseFormReturn<FieldValues, any, undefined>;
  isRecording: boolean;
  callStatus: string;
  transcription: Array<TranscriptionElement>;
  browserSupportsSpeechRecognition: boolean;
  isSpeaking: boolean;
  actions: {
    onSubmit: (data: FieldValues) => Promise<void>;
    startCallText: () => Promise<void>;
    stopCall: () => void;
  };
}
