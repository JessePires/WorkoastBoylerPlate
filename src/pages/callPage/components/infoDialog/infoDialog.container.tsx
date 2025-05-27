import { ContainerWithProps } from '@/@common/types/container.type';
import { InfoDialogContainerArgs } from './infoDialog.types';
import { useState } from 'react';

export const CallPageContainer = (props: ContainerWithProps<InfoDialogContainerArgs>): React.JSX.Element => {
  const [acceptRecording, setAcceptRecording] = useState<boolean>(false);

  return props.children({ acceptRecording, actions: { setAcceptRecording } });
};
