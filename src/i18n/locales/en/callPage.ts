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
    emptyDescription: 'The transcription will be shown here',
    formLabels: {
      transcription: 'Transcription',
    },
    buttons: {
      finishCall: 'Finish Call',
    },
    person: {
      interviewer: 'Interviewer',
      interviewee: 'You',
    },
  },
  callCard: {
    title: 'Call',
    startCall: 'Start Call',
    endCall: 'End Call',
    instructions: {
      title: 'Instructions',
      description:
        '<p>- Find a quiet and calm place for your interview.</p><p>- When the status is "Recording", say something to begin the interview.</p><p>- Be clear and precise in your answers.</p><p>- Avoid long pauses while speaking.</p>',
    },
    cannotDoItNow: 'Can’t do it now',
    start: 'Start',
    allowRecording: 'Allow call recording.',
  },
  callStatus: {
    title: 'Status',
    waiting: 'Waiting',
    connecting: 'Connecting, please wait...',
    connected: 'Connected',
    disconnected: 'Disconnected',
    error: 'Connection error',
    callClosed: 'Call ended',
  },
};

export default CallPage;
