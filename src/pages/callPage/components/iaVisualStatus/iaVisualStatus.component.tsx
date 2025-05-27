import { JSX, useEffect, useRef, useState } from 'react';
import { IaVisualStatusProps } from './iaVisualStatus.types';
import { CallStatusEnum } from '@/utils/enums/callStatus.enum';
import * as Icons from '../../../../assets/icons';
const NUM_BARS = 32;
const IaVisualStatus = (props: IaVisualStatusProps): JSX.Element => {
  const [frequencies, setFrequencies] = useState<number[]>(new Array(NUM_BARS).fill(0));
  const targetsRef = useRef<number[]>(new Array(NUM_BARS).fill(0));

  useEffect(() => {
    let targetInterval: NodeJS.Timeout | null = null;
    let animationInterval: NodeJS.Timeout | null = null;

    if (props.isSpeaking) {
      targetInterval = setInterval(() => {
        targetsRef.current = targetsRef.current.map(() => Math.floor(Math.random() * 100));
      }, 200);

      animationInterval = setInterval(() => {
        setFrequencies((prev) =>
          prev.map((current, i) => {
            const target = targetsRef.current[i];
            const delta = target - current;
            return current + delta * 0.1;
          }),
        );
      }, 30);
    } else {
      setFrequencies(new Array(NUM_BARS).fill(0.5));
    }

    return () => {
      if (targetInterval) clearInterval(targetInterval);
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [props.isSpeaking]);

  return (
    <>
      {props.callStatus === CallStatusEnum.CONNECTED ? (
        <div className="flex items-end justify-center h-64 w-full gap-1">
          {frequencies.map((value, idx) => (
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
};

export default IaVisualStatus;
