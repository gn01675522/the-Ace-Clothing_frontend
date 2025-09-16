import { GENERIC_INPUT_TYPES } from "../../../../../components/index";

export const loginFormConfig = {
  email: {
    id: "email",
    title: "帳號",
    name: "username",
    type: GENERIC_INPUT_TYPES.email,
    placeholder: "請輸入電子信箱",
    autoComplete: "username",
    required: true,
  },
  passward: {
    id: "password",
    title: "密碼",
    name: "password",
    type: GENERIC_INPUT_TYPES.password,
    placeholder: "請輸入密碼",
    autoComplete: "current-password",
    required: true,
  },
};
