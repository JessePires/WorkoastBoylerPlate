import { PersonTypeEnum } from '@/utils/enums/personType.enum';

export interface TranscriptionElement {
  person: PersonTypeEnum;
  transcript: string;
}

export interface TranscriptionCardProps {
  transcriptions: Array<TranscriptionElement>;
  className?: string;
}
