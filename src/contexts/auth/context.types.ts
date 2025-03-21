export type ContextType<T, P> = Partial<T> & {
  actions?: P;
};
