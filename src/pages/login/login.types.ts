import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface LoginContainerArgs {
  form: UseFormReturn<FieldValues, any, undefined>;
  actions: {
    onSubmit: (data: FieldValues) => Promise<void>;
  };
}
