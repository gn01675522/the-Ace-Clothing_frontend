import { Loading, Message, AceSVGIcon } from "../../components/index";

import {
  LoginForm,
  useNavigateWhenLoginSuccess,
  useFetchUserState,
} from "../../features/user/index";

import type { FC } from "react";

import "./Login.styles.scss";

const Login: FC = () => {
  useNavigateWhenLoginSuccess();
  const { isLoading, hasMessage, message } = useFetchUserState();

  return (
    <div className="login">
      {hasMessage && <Message />}
      {isLoading && <Loading />}
      <div className="login__info">
        <AceSVGIcon className="login__info-logo" />
        <h1 className="login__info-title">the ACE</h1>
      </div>
      <div className="login__actions">
        <h2 className="login__actions-title">登入資訊</h2>
        <div
          className={`login__alert ${message ? "login__alert--error" : ""}`}
          role="alert"
        >
          {message}
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
