import { JSX } from 'react';
import { IaVisualStatusContainerArgs, IaVisualStatusProps } from './iaVisualStatus.types';
import { CallStatusEnum } from '@/utils/enums/callStatus.enum';
import * as Icons from '../../../../assets/icons';
import * as Containers from './iaVisualStatus.containers';

const IaVisualStatus = (props: IaVisualStatusProps): JSX.Element => {
  return (
    <Containers.IaVisualStatusContainer isSpeaking={props.isSpeaking}>
      {(containerProps: IaVisualStatusContainerArgs): JSX.Element => {
        return (
          <>
            {props.callStatus === CallStatusEnum.CONNECTED ? (
              <div className="flex items-end justify-center h-64 w-full gap-1">
                {containerProps.frequencies.map((value, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-pantone-2765C-500 transition-all duration-75"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            ) : (
              <Icons.MicOffIcon color="stroke-gray-300" width="180" height="180" />
            )}
          </>
        );
      }}
    </Containers.IaVisualStatusContainer>
  );
};

export default IaVisualStatus;
