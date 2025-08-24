import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/index';

// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Проверяем, что элемент существует
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Создаем корневой React элемент
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);