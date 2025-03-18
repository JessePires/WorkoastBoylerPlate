import { JSX } from 'react';

type ChildrenWithOptionalArgs<T> = (args?: T) => JSX.Element;
type ChildrenWithRequiredArgs<T> = (args: T) => JSX.Element;

export type ContainerWithProps<T = undefined, P = object> = {
  children: T extends undefined ? ChildrenWithOptionalArgs<T> : ChildrenWithRequiredArgs<T>;
} & P;
