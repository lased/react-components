import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from 'components';
import App from './App';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
