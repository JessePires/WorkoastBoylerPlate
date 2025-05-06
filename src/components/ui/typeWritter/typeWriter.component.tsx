import { TypeWriterContainerArgs, TypeWriterProps } from './typeWriter.types';
import * as Containers from './typeWriter.container';

const TypeWriter = (props: TypeWriterProps): React.JSX.Element => {
  return (
    <Containers.TypeWriterContainer {...props}>
      {(containerProps: TypeWriterContainerArgs) => {
        return <p>{containerProps.currentText}</p>;
      }}
    </Containers.TypeWriterContainer>
  );
};

export default TypeWriter;
