import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  return <>{t('login.test')}</>;
};

export default Login;
