import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface EnterprisesContainerArgs {
  form: UseFormReturn<FieldValues, any, FieldValues>;
  dataSource: Array<Enterprise>;
  actions: {
    onCreateEnterprise: (data: FieldValues) => Promise<void>;
    clearForm: () => void;
  };
}

export interface Enterprise {
  id_enterprise: number;
  name: string;
  description: string;
}
