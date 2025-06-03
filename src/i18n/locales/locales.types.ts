export enum LocaleFilename {
  LOGIN = 'login',
}

export interface LoginNamespace {
  welcome: {
    label: string;
    description: string;
  };
  loginForm: {
    email: {
      title: string;
      placeholder: string;
    };
    password: string;
    forgotPassword: string;
    enter: string;
  };
  serviceTerms: string;
  errors: {
    emptyEmail: string;
    invalidEmail: string;
    emptyPassword: string;
  };
}

export interface DashboardNamespace {
  pageHeader: {
    pageTitle: string;
    pageDescription: string;
  };
  card: {
    priority: string;
    status: string;
    startCall: string;
  };
}

export interface BasePageNamespace {
  userSettings: {
    myAccount: string;
    logout: string;
  };
}

export interface CallPageNamespace {
  pageTitle: string;
  pageSubtitle: string;
  promptCard: {
    title: string;
    formLabels: {
      name: string;
      phone: string;
      prompt: string;
    };
    buttons: {
      cancel: string;
      startCall: string;
    };
  };
  transcriptionCard: {
    title: string;
    emptyDescription: string;
    formLabels: {
      transcription: string;
    };
    buttons: {
      finishCall: string;
    };
    person: {
      interviewer: string;
      interviewee: string;
    };
  };
  callCard: {
    title: string;
    startCall: string;
    endCall: string;
    instructions: {
      title: string;
      description: string;
    };
    cannotDoItNow: string;
    start: string;
    allowRecording: string;
  };
  callStatus: {
    title: string;
    waiting: string;
    connecting: string;
    connected: string;
    disconnected: string;
    error: string;
    callClosed: string;
  };
}
