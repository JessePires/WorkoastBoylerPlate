import { AuthContext } from '@/contexts/auth/auth.context';
import { AuthContextValues } from '@/contexts/auth/auth.types';
import { useContext } from 'react';

export const useAuth = (): AuthContextValues => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
