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
    emptyDescription: 'A transcrição será mostrada aqui',
    formLabels: {
      transcription: 'Transcrição',
    },
    buttons: {
      finishCall: 'Encerrar Chamada',
    },
    person: {
      interviewer: 'Entrevistador(a)',
      interviewee: 'Você',
    },
  },
  callCard: {
    title: 'Chamada',
    startCall: 'Iniciar Chamada',
    endCall: 'Encerrar Chamada',
    instructions: {
      title: 'Instruções',
      description:
        '<p>- Procure um ambiente tranquilo e silencioso para a sua entrevista.</p><p>- Quando o status estiver em "Gravando" fale algo para iniciar a entrevista.</p><p>- Seja claro e preciso em suas repostas.</p><p>- Evite pausas longas durante a sua fala.</p>',
    },
    cannotDoItNow: 'Não posso agora',
    start: 'Iniciar',
    allowRecording: 'Permitir gravação da chamada.',
  },
  callStatus: {
    title: 'Status',
    waiting: 'Aguardando',
    connecting: 'Conectando, por favor aguarde...',
    connected: 'Conectado',
    disconnected: 'Desconectado',
    error: 'Erro de conexão',
    callClosed: 'Chamada encerrada',
  },
};

export default CallPage;
