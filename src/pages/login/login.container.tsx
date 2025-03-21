import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX } from 'react';
import { LoginContainerArgs } from './login.types';
import { FieldValues, useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth/useAuth.hook';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/@common/constants/paths';

export const LoginContainer = (props: ContainerWithProps<LoginContainerArgs>): JSX.Element => {
  const form = useForm();
  const navigate = useNavigate();
  const authContext = useAuth();

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      const authenticateResponse = await authContext.actions.authenticate({
        email: data.email,
        password: data.password,
      });

      if (!authenticateResponse) {
        throw new Error(authenticateResponse);
      }

      navigate(Path.MAIN);
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
