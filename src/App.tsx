import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Alert, ProtectedRoute, Snackbar } from 'shared/components';
import { HomePage, LoginPage, ProtectedPage } from 'pages';
import { useErrorStore } from 'store/error';
import { useAxios } from 'shared/hooks';
import { useAuthStore } from 'store/auth';
import { API } from 'api';

import './App.css';

const App = () => {
  console.log('Render: App');

  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, login } = useAuthStore();
  const errorStore = useErrorStore();
  const location = useLocation();
  const navigate = useNavigate();
  const refresh = useAxios<{ accessToken: string }>(API.REFRESH_TOKEN);

  useEffect(() => {
    if (!isLoggedIn) {
      refresh.query();
    } else {
      setIsLoading(false);
    }

    const callback: any = (error: ErrorEvent) => {
      errorStore.setError(new Error(error.message));
    };

    window.addEventListener('error', callback);

    return () => window.removeEventListener('error', callback);
  }, []);
  useEffect(() => {
    if (refresh.isError) {
      navigate('/login', { state: { from: location } });
      setIsLoading(false);
    }
    if (refresh.isSuccess) {
      refresh.data && login(refresh.data.accessToken);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [refresh.isSuccess, refresh.isError]);

  if (isLoading) {
    return <strong>Loading...</strong>;
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<ProtectedPage />} />
            </Route>
          </Routes>
        </header>
      </div>
      <Snackbar
        open={errorStore.hasError}
        onClose={errorStore.clear}
        autoHideDuration={6000}
      >
        <Alert variant="error">{errorStore.message}</Alert>
      </Snackbar>
    </>
  );
};

export default App;
