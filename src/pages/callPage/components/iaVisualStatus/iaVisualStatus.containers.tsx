import { ContainerWithProps } from '@/@common/types/container.type';
import { JSX, useEffect, useRef, useState } from 'react';
import { IaVisualStatusContainerArgs, IaVisualStatusContainerProps } from './iaVisualStatus.types';

export const IaVisualStatusContainer = (
  props: ContainerWithProps<IaVisualStatusContainerArgs, IaVisualStatusContainerProps>,
): JSX.Element => {
  const NUM_BARS = 32;

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

  return props.children({
    frequencies,
  });
};
