import { AuthContextProvider } from './contexts/auth/auth.context';
import './i18n/config';

import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
