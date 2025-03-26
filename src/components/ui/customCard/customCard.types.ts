import { JSX } from 'react';

export interface CustomCardProps {
  header: JSX.Element;
  children: JSX.Element;
  footer?: JSX.Element;
  cardStyle?: string;
}
