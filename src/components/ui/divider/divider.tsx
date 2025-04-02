import { JSX } from 'react';
import { DividerProps } from './divider.types';

const Divider = (props: DividerProps): JSX.Element => {
  return <div className={`flex w-[100%] h-[1px] bg-black ${props.className}`}></div>;
};

export default Divider;
