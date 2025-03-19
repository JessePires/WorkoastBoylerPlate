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
}
