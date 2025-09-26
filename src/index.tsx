import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store/store";

import App from "./App";

import "./stylesheets/_reset.scss";
import "./stylesheets/main.scss";

const element = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(element);

root.render(
  <StrictMode>
    <Provider store={store()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
