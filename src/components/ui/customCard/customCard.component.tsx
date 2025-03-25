import { JSX } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../card';
import { CustomCardProps } from './customCard.types';

const CustomCard = (props: CustomCardProps): JSX.Element => {
  return (
    <Card>
      <CardHeader>{props.header}</CardHeader>
      <CardContent>{props.body}</CardContent>
      {props.footer && <CardFooter>{props.footer}</CardFooter>}
    </Card>
  );
};

export default CustomCard;
