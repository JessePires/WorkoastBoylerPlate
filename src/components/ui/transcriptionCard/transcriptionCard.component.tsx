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
  const transcriptionMock: Array<TranscriptionElement> = [
    {
      person: 'INTERVIEWEE',
      transcript: 'boa noite',
    },
    {
      person: 'INTERVIEWER',
      transcript: 'Boa noite! Eu poderia falar com o Jessé, por favor?',
    },
    {
      person: 'INTERVIEWEE',
      transcript: 'sou eu mesmo',
    },
    {
      person: 'INTERVIEWER',
      transcript:
        'Ótimo, Jessé! Meu nome é [Seu Nome], e estou ligando em nome da empresa Workoast sobre uma oportunidade para a posição de Engenheiro de Software. Antes de começarmos, gostaria de saber se você consente em gravarmos esta chamada para fins de qualidade. Tudo bem para você?',
    },
    {
      person: 'INTERVIEWEE',
      transcript: 'tudo bem Podemos sim',
    },
    {
      person: 'INTERVIEWER',
      transcript: 'Perfeito, muito obrigado! Vamos começar então. Jessé, por que você quer trabalhar na Workoast?',
    },
  ];

  return (
    <div className={cn('bg-white shadow-sm rounded-2xl', props.className)}>
      <div className="h-full max-h-[100%] overflow-y-auto p-2 flex flex-col gap-2.5">
        {transcriptionMock.map((element) => renderTrasncriptionMessage(element))}
      </div>
    </div>
  );
};

export default TranscriptonCard;
