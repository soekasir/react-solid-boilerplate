import React from "react";
import "reflect-metadata";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers";
import "./styles/global.css";
import { SingletonContainer } from "./utils/container";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <SingletonContainer>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </SingletonContainer>
);
