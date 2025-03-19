import { JSX, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Path } from './@common/constants/paths';
import Login from './pages/login/login.component';

const Main = lazy(() => import('./pages/main/main.component'));

const AppRoutes = (): JSX.Element => {
  const location = useLocation();
  const isAuthenticated = false;
  const notRequiredTokenRoutes = [Path.LOGIN];

  if (!isAuthenticated && !notRequiredTokenRoutes.includes(location.pathname as Path)) {
    return <Navigate to={Path.LOGIN} replace />;
  }

  return (
    <Routes>
      <Route path={Path.MAIN} element={<Main />} />
      <Route path={Path.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
