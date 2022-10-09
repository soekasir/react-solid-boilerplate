import React from "react";
import "reflect-metadata";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers";
import "./styles/global.css";
import { GlobalContainer } from "./utils/container";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalContainer>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GlobalContainer>
  </React.StrictMode>
);
