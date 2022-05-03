import { Link, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'shared/components';
import Modal from 'shared/components/Modal/Modal';
import { HomePage, ProtectedPage } from 'pages';
import { useErrorStore } from 'store/error';

import './App.css';

const App = () => {
  console.log('Render: App');

  const errorStore = useErrorStore();

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Link to="/">To home</Link>
          <Link to="/protected">To protected</Link>
          <button onClick={() => errorStore.setError(new Error('Error'))}>
            Get error
          </button>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
