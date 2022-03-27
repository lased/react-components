import React from 'react';
import { GoogleLogin } from 'react-google-login';

import logo from './logo.svg';

import './App.css';

function App() {
  const responseGoogle = (...args: any) => {
    console.log(args);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <GoogleLogin
            clientId="239837735685-t2feajhlndh9f55j0b8n6heqke0c2odn.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />,
        </a>
      </header>
    </div>
  );
}

export default App;
