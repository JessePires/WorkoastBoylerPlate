import { LoginNamespace } from '../locales.types';

const Login: LoginNamespace = {
  welcome: {
    label: 'Welcome',
    description: 'Enter your credentials to access the system',
  },
  loginForm: {
    email: {
      title: 'Email',
      placeholder: 'name@company.com',
    },
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    enter: 'Login',
  },
  serviceTerms: 'By logging in, you agree to our terms of service.',
  errors: {
    emptyEmail: 'Please enter an email.',
    invalidEmail: 'Invalid email!',
    emptyPassword: 'Please enter a password.',
  },
};

export default Login;
