import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App.tsx";

import "./stylesheets/_reset.scss";
import "./stylesheets/main.scss";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:3000";

const element = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(element);

root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
