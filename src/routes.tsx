import { JSX, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Path } from './@common/constants/paths';
import Login from './pages/login/login.component';
import { useAuth } from './hooks/auth/useAuth.hook';
import BasePage from './pages/basePage/basePage.component';

const Dashboard = lazy(() => import('./pages/dashboard/dashboard.component'));
const CallPage = lazy(() => import('./pages/callPage/callPage.component'));

const AppRoutes = (): JSX.Element => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;
  const notRequiredTokenRoutes = [Path.LOGIN];

  if (!isAuthenticated && !notRequiredTokenRoutes.includes(location.pathname as Path)) {
    return <Navigate to={Path.LOGIN} replace />;
  }

  return (
    <Routes>
      <Route element={<BasePage isAuthenticated={Boolean(isAuthenticated)} />}>
        <Route path={Path.DASHBOARD} element={<Dashboard />} />
        <Route path={Path.CALL_PAGE} element={<CallPage />} />
      </Route>
      <Route path={Path.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
