import { CallPageNamespace } from '../locales.types';

const CallPage: CallPageNamespace = {
  pageTitle: 'Workboat - {{callName}}',
  pageSubtitle: 'Gerencie sua ligação',
  promptCard: {
    title: 'Prompt',
    formLabels: {
      name: 'Seu nome',
      phone: 'Telefone',
      prompt: 'Prompt',
    },
    buttons: {
      cancel: 'Cancelar',
      startCall: 'Iniciar Ligação',
    },
  },
  transcriptionCard: {
    title: 'Transcrição',
    formLabels: {
      transcription: 'Transcrição',
    },
    buttons: {
      finishCall: 'Finalizar Ligação',
    },
  },
};

export default CallPage;
