import { Route, Routes } from 'react-router-dom';

import { Modal, ProtectedRoute } from 'shared/components';
import { HomePage, LoginPage, ProtectedPage } from 'pages';
import { useErrorStore } from 'store/error';

import './App.css';
import { useEffect } from 'react';

const App = () => {
  console.log('Render: App');

  const errorStore = useErrorStore();

  useEffect(() => {
    const callback: any = (error: ErrorEvent) => {
      errorStore.setError(new Error(error.message));
    };

    window.addEventListener('error', callback);

    return () => window.removeEventListener('error', callback);
  }, []);

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
      <Modal open={errorStore.hasError} onClose={errorStore.clear}>
        {errorStore.error?.message}
      </Modal>
    </>
  );
};

export default App;
