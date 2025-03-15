import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  return <div className="w-full h-screen flex flex-col justify-center items-center">{t('login.test')}</div>;
};

export default Login;
