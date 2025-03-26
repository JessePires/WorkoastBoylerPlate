import { JSX } from 'react';
import { CustomCardProps } from './customCard.types';

const CustomCard = (props: CustomCardProps): JSX.Element => {
  return (
    <div className={`rounded-md border border-gray-300 bg-white shadow-lg p-6 ${props.cardStyle ?? ''}`}>
      <div>{props.header}</div>
      <div>{props.children}</div>
      {props.footer && <div>{props.footer}</div>}
    </div>
  );
};

export default CustomCard;
