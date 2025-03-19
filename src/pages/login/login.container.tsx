import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX } from 'react';
import { LoginContainerArgs } from './login.types';
import { useForm } from 'react-hook-form';

export const LoginContainer = (props: ContainerWithProps<LoginContainerArgs>): JSX.Element => {
  const form = useForm();

  const onSubmit = (): void => console.log('submit');

  return props.children({
    form,
    actions: {
      onSubmit,
    },
  });
};
