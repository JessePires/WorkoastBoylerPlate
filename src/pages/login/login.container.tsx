import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX } from 'react';
import { LoginContainerArgs } from './login.types';
import { FieldValues, useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth/useAuth.hook';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/@common/constants/paths';
import { LoginSchema } from '@/joi/login.schema';

export const LoginContainer = (props: ContainerWithProps<LoginContainerArgs>): JSX.Element => {
  const form = useForm();
  const navigate = useNavigate();
  const authContext = useAuth();

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      await LoginSchema.login.validateAsync(data, { abortEarly: false });

      const authenticateResponse = await authContext.actions?.authenticate(data.email, data.password);

      if (!authenticateResponse) {
        throw new Error(authenticateResponse);
      }

      navigate(Path.DASHBOARD);
    } catch (error: any) {
      if (error.details) {
        error.details.forEach((error: any) => {
          form.setError(error.path[0], { message: error.message });
        });
      } else {
        console.log('else', error);
      }
    }
  };

  return props.children({
    form,
    actions: {
      onSubmit,
    },
  });
};
