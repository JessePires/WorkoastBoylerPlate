import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface PasswordInputProps {
  form: UseFormReturn<FieldValues, any, undefined>;
}

export interface PasswordInputContainerArgs {
  showPassword: boolean;
  actions: {
    toggleShowPassword: () => void;
  };
}
