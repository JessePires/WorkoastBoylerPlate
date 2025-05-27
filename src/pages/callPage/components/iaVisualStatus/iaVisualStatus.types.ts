import { CallStatusEnum } from '@/utils/enums/callStatus.enum';

export interface IaVisualStatusProps {
  callStatus: CallStatusEnum;
  isSpeaking: boolean;
}
