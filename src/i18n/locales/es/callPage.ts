import { CallPageNamespace } from '../locales.types';

const CallPage: CallPageNamespace = {
  pageTitle: 'Workboat - {{callName}}',
  pageSubtitle: 'Gestiona tu llamada',
  promptCard: {
    title: 'Indicaciones',
    formLabels: {
      name: 'Tu nombre',
      phone: 'Teléfono',
      prompt: 'Indicación',
    },
    buttons: {
      cancel: 'Cancelar',
      startCall: 'Iniciar Llamada',
    },
  },
  transcriptionCard: {
    title: 'Transcripción',
    formLabels: {
      transcription: 'Transcripción',
    },
    buttons: {
      finishCall: 'Finalizar Llamada',
    },
    peopleInvolved: {
      you: 'Tú:',
      interviwer: 'Entrevistador(a):',
    },
  },
};

export default CallPage;
