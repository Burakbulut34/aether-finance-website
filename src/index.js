// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Sadece App'i çağırıyoruz
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Bunu ekle

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* BÜTÜN UYGULAMAYI BURADA SARMALIYORUZ */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);