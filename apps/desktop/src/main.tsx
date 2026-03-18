import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { applyCachedThemeSnapshot } from './store';

console.log('Renderer: main.tsx starting');

window.onerror = (msg, url, line, col, error) => {
  document.body.innerHTML = `<div style="color: white; background: red; padding: 20px; font-family: sans-serif;">
    <h1>Fatal Error</h1>
    <p>${msg}</p>
    <pre>${error?.stack}</pre>
  </div>`;
};

window.addEventListener('unhandledrejection', event => {
  const reason = event.reason as any;
  document.body.innerHTML = `<div style="color: white; background: red; padding: 20px; font-family: sans-serif;">
    <h1>Unhandled Promise Rejection</h1>
    <p>${reason?.message ?? String(reason)}</p>
    <pre>${reason?.stack ?? ''}</pre>
  </div>`;
});

try {
  applyCachedThemeSnapshot();
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
  );
} catch (e: any) {
  document.body.innerHTML = `<div style="color: white; background: red; padding: 20px;">
    <h1>Render Error</h1>
    <p>${e.message}</p>
    <pre>${e.stack}</pre>
  </div>`;
}
