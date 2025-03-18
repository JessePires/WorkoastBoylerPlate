import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX } from 'react';
import { LoginArgs } from './login.types';

const LoginContainer = (props: ContainerWithProps<LoginArgs>): JSX.Element => {
  return props.children({});
};

export default LoginContainer;
