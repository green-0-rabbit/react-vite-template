import "@abraham/reflection";
/* eslint-disable react/no-unescaped-entities */
import { StrictMode } from "react";
import { render } from "react-dom";
// import 'tailwindcss/tailwind.css';
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "twin.macro";
import "./index.css";
import AppModule from "./app.module";
import CoreModule from "./core/core.module";

render(
  <StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <CoreModule>
        <AppModule />
      </CoreModule>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
