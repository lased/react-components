import { Route, Routes, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from 'shared/components';
import { HomePage, ProtectedPage } from 'pages';
import { useErrorStore } from 'store/error';

import './App.css';
import Modal from 'shared/components/Modal/Modal';

const App = () => {
  console.log('Render: App');

  const navigate = useNavigate();
  const error = useErrorStore();

  return (
    <>
      <div className="App">
        <header className="App-header">
          <button onClick={() => navigate('/')}>To home</button>
          <button onClick={() => navigate('/protected')}>To protected</button>
          <button onClick={() => error.setError('Error')}>Get error</button>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<ProtectedPage />} />
            </Route>
          </Routes>
        </header>
      </div>
      <Modal open={error.hasError} onClose={error.clear}>
        {error.message}
      </Modal>
    </>
  );
};

export default App;
