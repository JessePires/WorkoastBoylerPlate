import { createContext, JSX, useState } from 'react';
import { AuthContextActions, AuthContextProviderProps, AuthContextValues } from './auth.types';
import { AuthenticationController } from '@/domain/authentication/authentication.controller';

export const AuthContext = createContext<AuthContextValues>({});

export const AuthContextProvider = (props: AuthContextProviderProps): JSX.Element => {
  const authController = new AuthenticationController();

  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>();
  const [userData, setUserData] = useState();

  const authenticate = async (email: string, password: string): Promise<void> => {
    try {
      const data = await authController.authenticate({ email, password });

      if (data.email) {
        setIsAuthenticated(true);
        setUserData(data);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const actions: AuthContextActions = { authenticate };

  return <AuthContext.Provider value={{ isAuthenticated, userData, actions }}>{props.children}</AuthContext.Provider>;
};
