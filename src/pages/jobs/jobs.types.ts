import { SelectElement } from '@/@common/types/select.type';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface JobsContainerArgs {
  form: UseFormReturn<FieldValues, any, FieldValues>;
  dataSource: Array<Job>;
  isSheetOpen: boolean;
  enterprises: Array<SelectElement>;
  actions: {
    onCreateJob: (data: FieldValues) => Promise<void>;
    clearForm: () => void;
    setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export interface Job {
  id: number;
  enterprise: string;
  name: string;
  description: string;
}
