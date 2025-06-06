import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface EnterprisesContainerArgs {
  form: UseFormReturn<FieldValues, any, FieldValues>;
  dataSource: Array<Enterprise>;
  isSheetOpen: boolean;
  actions: {
    onCreateEnterprise: (data: FieldValues) => Promise<void>;
    clearForm: () => void;
    setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export interface Enterprise {
  id_enterprise: number;
  name: string;
  description: string;
}
