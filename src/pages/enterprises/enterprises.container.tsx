import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Enterprise, EnterprisesContainerArgs } from './enterprises.types';
import { EnterprisesController } from '@/domain/enterprises/enterprises.controller';

export const EnterprisesContainer = (props: ContainerWithProps<EnterprisesContainerArgs>): JSX.Element => {
  const form = useForm({ defaultValues: { name: '', description: '' } });
  const enterpriseController = new EnterprisesController();

  const [dataSource, setDataSource] = useState<Array<Enterprise>>([]);

  const onCreateEnterprise = async (data: FieldValues): Promise<void> => {
    try {
      const response = await enterpriseController.create(data);

      if (response.data.data.enterpriseId) {
        await loadData();
      }
    } catch (error: any) {
      if (error.details) {
        error.details.forEach((error: any) => {
          form.setError(error.path[0], { message: error.message });
        });
      } else {
        console.log('error', error);
      }
    }
  };

  const loadData = async (): Promise<any> => {
    try {
      const response = await enterpriseController.list();

      if (response.data.data) {
        setDataSource(response.data.data);
      }
    } catch (error: any) {
      if (error.details) {
        error.details.forEach((error: any) => {
          form.setError(error.path[0], { message: error.message });
        });
      } else {
        console.log('error', error);
      }
    }
  };

  const clearForm = (): void => {
    form.clearErrors();
    form.reset();
  };

  useEffect(() => {
    loadData();
  }, []);

  return props.children({
    form,
    dataSource,
    actions: {
      onCreateEnterprise,
      clearForm,
    },
  });
};
