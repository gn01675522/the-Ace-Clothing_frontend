import {
  Button,
  BUTTON_TYPE_CLASS,
  GenericInput,
} from "../../../../components/index";

import { useLoginFormControl } from "../../hooks/user.hooks";

import { loginFormConfig } from "./config/login-form.config";

import type { FC } from "react";

import "./LoginForm.styles.scss";

export const LoginForm: FC = () => {
  const { data, handleChange, onSubmitHandler } = useLoginFormControl();

  const { email, passward } = loginFormConfig;

  return (
    <form className="login-form">
      <GenericInput
        {...email}
        value={data.username}
        onChange={handleChange}
        wrapperClass="login-form__item"
        labelClass="login-form__item-label"
        inputClass="login-form__item-email"
      />
      <GenericInput
        {...passward}
        value={data.password}
        onChange={handleChange}
        wrapperClass="login-form__item"
        labelClass="login-form__item-label"
        inputClass="login-form__item-password"
      />

      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onSubmitHandler}
        disabled={data.username === "" || data.password === ""}
      >
        登入
      </Button>
    </form>
  );
};
