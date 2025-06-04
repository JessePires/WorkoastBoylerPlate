import { ContainerWithProps } from '@/@common/types/container.type';
import { useState } from 'react';
import { InfoDialogContainerArgs } from './infoDialog.types';

export const CallPageContainer = (props: ContainerWithProps<InfoDialogContainerArgs>): React.JSX.Element => {
  const [acceptRecording, setAcceptRecording] = useState<boolean>(false);

  return props.children({ acceptRecording, actions: { setAcceptRecording } });
};
