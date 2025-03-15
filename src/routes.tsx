import { JSX } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Path } from './@common/constants/paths';
import Main from './pages/main/main.component';
import Login from './pages/login/login.component';

const AppRoutes = (): JSX.Element => {
  const location = useLocation();
  const isAuthenticated = false;
  const notRequiredTokenRoutes = [Path.LOGIN];

  if (!isAuthenticated && !notRequiredTokenRoutes.includes(location.pathname as Path)) {
    return <Navigate to={Path.LOGIN} replace />;
  }

  return (
    <Routes>
      <Route path={Path.LOGIN} element={<Login />} />
      <Route path={Path.MAIN} element={<Main />} />
    </Routes>
  );
};

export default AppRoutes;
