import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Job, JobsContainerArgs } from './jobs.types';
import { SelectElement } from '@/@common/types/select.type';
import { EnterprisesController } from '@/domain/enterprises/enterprises.controller';
import { Enterprise } from '../enterprises/enterprises.types';
import { JobsController } from '@/domain/jobs/jobs.controller';

export const JobsContainer = (props: ContainerWithProps<JobsContainerArgs>): JSX.Element => {
  const form = useForm();
  const jobsController = new JobsController();
  const enterprisesController = new EnterprisesController();

  const [dataSource, setDataSource] = useState<Array<Job>>([]);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [enterprises, setEnterprises] = useState<Array<SelectElement>>([]);

  const onCreateJob = async (data: FieldValues): Promise<void> => {
    try {
      const response = await jobsController.create({
        description: data.description,
        id_enterprise: data.id_enterprise,
        name: data.name,
      });

      if (response.data.id) {
        await loadData();
        clearForm();
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
      const response = await jobsController.list();

      if (response.data) {
        setDataSource(response.data);
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

  const loadEnterprises = async (): Promise<any> => {
    try {
      const response = await enterprisesController.list();

      if (response.data.length > 0) {
        setEnterprises(
          response.data.map(
            (enterprise: Enterprise): SelectElement => ({ id: enterprise.id_enterprise, name: enterprise.name }),
          ),
        );
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
    setIsSheetOpen(false);
  };

  useEffect(() => {
    loadData();
    loadEnterprises();
  }, []);

  return props.children({
    form,
    dataSource,
    isSheetOpen,
    enterprises,
    actions: {
      onCreateJob,
      clearForm,
      setIsSheetOpen,
    },
  });
};
