import { JSX } from 'react';
import { TranscriptionCardProps, TranscriptionElement } from './transcriptionCard.types';
import { cn } from '@/lib/utils';
import { PersonTypeEnum, PersonTypeLabelEnum } from '@/utils/enums/personType.enum';
import { t } from 'i18next';
import TypeWriter from '../typeWritter/typeWriter.component';

const renderTrasncriptionMessage = (transcription: TranscriptionElement): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-fit max-w-[60%] p-4 rounded-2xl bg-pantone-2191C-50 ${transcription.person === PersonTypeEnum.INTERVIEWEE ? 'self-end' : ''}`}
    >
      <span className="text-pantone-1575C-500 font-extrabold">
        {t(PersonTypeLabelEnum[transcription.person as keyof typeof PersonTypeLabelEnum])}
      </span>
      <TypeWriter text={transcription.transcript} delay={35} className="ml-9" />
    </div>
  );
};

const TranscriptonCard = (props: TranscriptionCardProps): JSX.Element => {
  return (
    <div className={cn('bg-white shadow-sm rounded-2xl', props.className)}>
      {props.transcriptions.length > 0 ? (
        <div className="h-full max-h-[100%] overflow-y-auto p-2 flex flex-col gap-2.5">
          {props.transcriptions.map((element) => renderTrasncriptionMessage(element))}
        </div>
      ) : (
        <div className="flex h-full justify-center items-center w-[45%] self-center justify-self-center">
          <span className="text-2xl font-medium text-center text-gray-300">A transcrição será mostrada aqui</span>
        </div>
      )}
    </div>
  );
};

export default TranscriptonCard;
