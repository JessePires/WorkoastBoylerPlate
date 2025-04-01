import { JSX } from 'react';
import { DividerProps } from './divider.types';

const Divider = (props: DividerProps): JSX.Element => {
  return <div className={`flex w-[100%] h-[1px] ${props.background ?? 'bg-black'}`}></div>;
};

export default Divider;
