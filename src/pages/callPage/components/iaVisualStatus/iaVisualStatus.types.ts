import { CallStatusEnum } from '@/utils/enums/callStatus.enum';

export interface IaVisualStatusProps {
  callStatus: CallStatusEnum;
  isSpeaking: boolean;
}

export interface IaVisualStatusContainerArgs {
  frequencies: Array<number>;
}

export interface IaVisualStatusContainerProps {
  isSpeaking: boolean;
}
