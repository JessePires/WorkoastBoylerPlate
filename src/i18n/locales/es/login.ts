import { LoginNamespace } from '../locales.types';

const Login: LoginNamespace = {
  welcome: {
    label: 'Bienvenido',
    description: 'Ingrese sus credenciales para acceder al sistema',
  },
  loginForm: {
    email: {
      title: 'Email',
      placeholder: 'nombre@empresa.com',
    },
    password: 'Contraseña',
    forgotPassword: '¿Olvidó su contraseña?',
    enter: 'Iniciar sesión',
  },
  serviceTerms: 'Al iniciar sesión, acepta nuestros términos de servicio.',
  errors: {
    emptyEmail: 'Por favor, ingrese un correo electrónico.',
    invalidEmail: '¡Correo electrónico no válido!',
    emptyPassword: 'Por favor, ingrese una contraseña.',
  },
};

export default Login;
