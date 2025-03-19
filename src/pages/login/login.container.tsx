import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX } from 'react';
import { LoginContainerArgs } from './login.types';
import { useForm } from 'react-hook-form';

export const LoginContainer = (props: ContainerWithProps<LoginContainerArgs>): JSX.Element => {
  const form = useForm();

  const onSubmit = (data: { username: string; password: string }): void => {
    try {
      console.log('data', data);
    } catch (error) {
      console.log('error');
    }
  };

  return props.children({
    form,
    actions: {
      onSubmit,
    },
  });
};
