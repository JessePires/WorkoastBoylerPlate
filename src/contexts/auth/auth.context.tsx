import { createContext, JSX, useState } from 'react';
import { AuthContextActions, AuthContextProviderProps, AuthContextValues } from './auth.types';
import { AuthenticationController } from '@/domain/authentication/authentication.controller';
import { StorageKeys } from '@/@common/constants/storage';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/@common/constants/paths';

const getInitialValue = () => {
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER) ?? '{}');

  return { email: user, isAuthenticated: !!user && !!user?.email };
};

export const AuthContext = createContext<AuthContextValues>({});

export const AuthContextProvider = (props: AuthContextProviderProps): JSX.Element => {
  const navigate = useNavigate();

  const authController = new AuthenticationController();
  const initialValue = getInitialValue();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated);
  const [userData, setUserData] = useState({ email: initialValue.email });

  const authenticate = async (email: string, password: string): Promise<void> => {
    try {
      const data = await authController.authenticate({ email, password });

      if (data.data) {
        setIsAuthenticated(true);
        setUserData(data.data.user);
        localStorage.setItem(StorageKeys.JWT_TOKEN, data.data.token);
        localStorage.setItem(
          StorageKeys.USER,
          JSON.stringify({ email: data.data.user.email, name: data.data.user.name }),
        );
      }

      return data;
    } catch (error) {
      console.log('error', error);

      setIsAuthenticated(false);
    }
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    localStorage.removeItem(StorageKeys.JWT_TOKEN);
    localStorage.removeItem(StorageKeys.USER);

    navigate(Path.LOGIN);
  };

  const actions: AuthContextActions = { authenticate, logout };

  return <AuthContext.Provider value={{ isAuthenticated, userData, actions }}>{props.children}</AuthContext.Provider>;
};
