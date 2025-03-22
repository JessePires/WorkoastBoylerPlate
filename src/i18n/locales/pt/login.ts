import { LoginNamespace } from '../locales.types';

const Login: LoginNamespace = {
  welcome: {
    label: 'Bem-vindo',
    description: 'Entre com suas credenciais para acessar o sistema',
  },
  loginForm: {
    email: {
      title: 'Email',
      placeholder: 'nome@empresa.com',
    },
    password: 'Senha',
    forgotPassword: 'Esqueceu sua senha?',
    enter: 'Entrar',
  },
  serviceTerms: 'Ao entrar, vc concorda com nossos termos de serviço.',
  errors: {
    emptyEmail: 'Por favor informe um email.',
    invalidEmail: 'Email inválido!',
    emptyPassword: 'Por favor informe uma senha.',
  },
};

export default Login;
