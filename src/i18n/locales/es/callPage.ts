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
    emptyDescription: 'La transcripción se mostrará aquí',
    formLabels: {
      transcription: 'Transcripción',
    },
    buttons: {
      finishCall: 'Finalizar Llamada',
    },
    person: {
      interviewer: 'Entrevistador(a)',
      interviewee: 'Usted',
    },
  },
  callCard: {
    title: 'Llamada',
    startCall: 'Iniciar Llamada',
    endCall: 'Finalizar Llamada',
    instructions: {
      title: 'Instrucciones',
      description:
        '<p>- Busca un lugar tranquilo y silencioso para tu entrevista.</p><p>- Cuando el estado sea "Grabando", di algo para comenzar la entrevista.</p><p>- Sé claro y preciso en tus respuestas.</p><p>- Evita pausas largas durante tu habla.</p>',
    },
    cannotDoItNow: 'No puedo ahora',
    start: 'Iniciar',
    allowRecording: 'Permitir grabación de la llamada.',
  },
  callStatus: {
    title: 'Status',
    waiting: 'Esperando',
    connecting: 'Conectando, por favor espere...',
    connected: 'Conectado',
    disconnected: 'Desconectado',
    error: 'Error de conexión',
    callClosed: 'Llamada finalizada',
  },
};

export default CallPage;
