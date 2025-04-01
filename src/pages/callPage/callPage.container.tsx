import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { CallPageContainerArgs } from './callPage.types';

export const CallPageContainer = (props: ContainerWithProps<CallPageContainerArgs>): JSX.Element => {
  const form = useForm();

  const onSubmit = async (data: FieldValues): Promise<void> => {
    console.log('data', data);
  };

  return props.children({
    form,
    actions: {
      onSubmit,
    },
  });
};
