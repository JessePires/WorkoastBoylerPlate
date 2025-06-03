import { ContainerWithProps } from '@/@common/types/container.type';
import { useEffect, useState } from 'react';
import { TypeWriterContainerArgs, TypeWriterContainerProps } from './typeWriter.types';

export const TypeWriterContainer = (
  props: ContainerWithProps<TypeWriterContainerArgs, TypeWriterContainerProps>,
): React.JSX.Element => {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (props.text === '') {
      setCurrentIndex(0);
      setCurrentText('');
    }

    if (currentIndex < props.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevState) => `${prevState}${props.text[currentIndex]}`);
        setCurrentIndex((prevState) => prevState + 1);
      }, props.delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, props.delay, props.text]);

  return props.children({
    currentText,
  });
};
