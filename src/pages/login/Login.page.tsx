import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import {
  Button,
  BUTTON_TYPE_CLASS,
  Loading,
  Message,
  AceSVGIcon,
} from "../../components/index";

import { selectHasMessage } from "../../store/message/message.selector";
import {
  setCurrentUserAsync,
  selectUserLoginIsSuccess,
  selectUserLoginIsLoading,
  selectUserLoginMessage,
} from "../../features/user/index";

import type { FC, ChangeEvent } from "react";

import "./Login.styles.scss";

const Login: FC = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSuccess = useAppSelector(selectUserLoginIsSuccess);
  const isLoading = useAppSelector(selectUserLoginIsLoading);
  const hasMessage = useAppSelector(selectHasMessage);
  const message = useAppSelector(selectUserLoginMessage);

  //* 取得 user 輸入資料
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  //* 點選登入後，使用 redux 來登入
  const onSubmitHandler = () => {
    dispatch(setCurrentUserAsync(data));
  };

  //* 如果 user 登入成功，那麼就轉址去 products
  useEffect(() => {
    if (isSuccess === true) {
      navigate("/admin/products");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      {hasMessage && <Message />}
      <div className="login">
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
          <form className="login__form">
            <div className="login__form-items">
              <label htmlFor="email" className="login__form-items-label">
                帳號
              </label>
              <input
                id="email"
                className="login__form-items-email"
                name="username"
                type="email"
                placeholder="請輸入電子信箱"
                autoComplete="username"
                onChange={handleChange}
                required={true}
              />
            </div>

            <div className="login__form-items">
              <label htmlFor="password" className="login__form-items-label">
                密碼
              </label>
              <input
                type="password"
                className="login__form-items-password"
                name="password"
                id="password"
                placeholder="請輸入密碼"
                autoComplete="current-password"
                onChange={handleChange}
                required={true}
              />
            </div>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
              onClick={onSubmitHandler}
              disabled={data.username === "" || data.password === ""}
            >
              登入
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
