import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from 'components';
import App from './App';

import './index.css';

if (process.env.NODE_ENV === 'production') {
  const win = window as any;

  for (const prop in win.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    if (prop === 'renderers') {
      win.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
      continue;
    }
    win.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
      typeof win.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function'
        ? Function.prototype
        : null;
  }
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
