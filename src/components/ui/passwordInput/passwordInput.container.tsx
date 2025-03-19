import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX, useState } from 'react';
import { PasswordInputContainerArgs } from './passwordInput.types';

export const PasswordInputContainer = (props: ContainerWithProps<PasswordInputContainerArgs>): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return props.children({
    showPassword,
    actions: {
      toggleShowPassword,
    },
  });
};
