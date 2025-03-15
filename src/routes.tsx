import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Path } from './@common/constants/paths';
import Main from './pages/main/main.component';

const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route path={Path.MAIN} element={<Main />} />
    </Routes>
  );
};

export default AppRoutes;
