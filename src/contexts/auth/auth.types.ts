import { ContextType } from 'react';

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type AuthContextStates = {
  isAuthenticated: boolean;
  userData: any;
};

export type AuthContextActions = {
  authenticate: (email: string, password: string) => Promise<void>;
};

export type AuthContextValues = ContextType<AuthContextStates, AuthContextActions>;
