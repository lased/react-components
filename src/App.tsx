import { useState } from 'react';

import { TestStore } from 'components';

import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from 'shared/components';
import { HomePage, ProtectedPage } from 'pages';

const App = () => {
  console.log('Render: App');

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => navigate('/')}>To home</button>
        <button onClick={() => navigate('/protected')}>To protected</button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<ProtectedPage />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
};

export default App;
