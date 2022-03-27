import React from 'react';

import Calendar from './Calendar';
import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Calendar />
      </header>
    </div>
  );
}

export default App;
