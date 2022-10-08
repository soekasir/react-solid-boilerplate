import React from 'react';
import "reflect-metadata"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Router from './routers';
import './styles/global.css';
import AppContainer from './Container';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContainer>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContainer>
  </React.StrictMode>
);
