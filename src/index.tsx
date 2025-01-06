import { StrictMode } from "react";
// import { HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

import { store } from "./store/store";

import App from "./App";

import "./stylesheets/_reset.scss";
import "./stylesheets/main.scss";

axios.defaults.baseURL = process.env.APP_API_URL || "http://localhost:3000";

const element = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(element);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
