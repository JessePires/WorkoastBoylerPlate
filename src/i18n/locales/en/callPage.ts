import { CallPageNamespace } from '../locales.types';

const CallPage: CallPageNamespace = {
  pageTitle: 'Workboat - {{callName}}',
  pageSubtitle: 'Manage your call',
  promptCard: {
    title: 'Prompt',
    formLabels: {
      name: 'Your name',
      phone: 'Phone',
      prompt: 'Prompt',
    },
    buttons: {
      cancel: 'Cancel',
      startCall: 'Start Call',
    },
  },
  transcriptionCard: {
    title: 'Transcription',
    formLabels: {
      transcription: 'Transcription',
    },
    buttons: {
      finishCall: 'Finish Call',
    },
    peopleInvolved: {
      you: 'You:',
      interviwer: 'Interviewer:',
    },
  },
};

export default CallPage;
