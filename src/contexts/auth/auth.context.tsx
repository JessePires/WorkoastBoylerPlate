import { createContext, JSX, useState } from 'react';
import { AuthContextActions, AuthContextProviderProps, AuthContextValues } from './auth.types';
import { AuthenticationController } from '@/domain/authentication/authentication.controller';
import { StorageKeys } from '@/@common/constants/storage';

const getInitialValue = () => {
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER) ?? '{}');

  return { email: user, isAuthenticated: !!user && !!user?.email };
};

export const AuthContext = createContext<AuthContextValues>({});

export const AuthContextProvider = (props: AuthContextProviderProps): JSX.Element => {
  const authController = new AuthenticationController();
  const initialValue = getInitialValue();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated);
  const [userData, setUserData] = useState({ email: initialValue.email });

  const authenticate = async (email: string, password: string): Promise<void> => {
    try {
      const data = await authController.authenticate({ email, password });

      if (data.email) {
        setIsAuthenticated(true);
        setUserData(data);
        localStorage.setItem(StorageKeys.JWT_TOKEN, 'fslkfjslkds');
        localStorage.setItem(StorageKeys.USER, JSON.stringify({ email: data.email }));
      }

      return data;
    } catch (error) {
      console.log('error', error);

      setIsAuthenticated(false);
    }
  };

  const actions: AuthContextActions = { authenticate };

  return <AuthContext.Provider value={{ isAuthenticated, userData, actions }}>{props.children}</AuthContext.Provider>;
};
