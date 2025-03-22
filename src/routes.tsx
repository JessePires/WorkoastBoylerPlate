import { JSX, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Path } from './@common/constants/paths';
import Login from './pages/login/login.component';
import { useAuth } from './hooks/auth/useAuth.hook';

const Dashboard = lazy(() => import('./pages/dashboard/dashboard.component'));

const AppRoutes = (): JSX.Element => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const notRequiredTokenRoutes = [Path.LOGIN];

  if (!isAuthenticated && !notRequiredTokenRoutes.includes(location.pathname as Path)) {
    return <Navigate to={Path.LOGIN} replace />;
  }

  return (
    <Routes>
      <Route path={Path.DASHBOARD} element={<Dashboard />} />
      <Route path={Path.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
