import { GENERIC_INPUT_TYPES } from "../../../../../components/index";

import { CHECKOUT_INPUT_CLASSES } from "../../../types/admin-orders.types";

export const checkoutFormConfig = {
  name: {
    key: CHECKOUT_INPUT_CLASSES.name,
    title: "姓名",
    rules: {
      required: "使用者名稱為必填",
      maxLength: {
        value: 10,
        message: "使用者名稱長度不超過 10",
      },
    },
  },
  tel: {
    key: CHECKOUT_INPUT_CLASSES.tel,
    title: "聯絡電話",
    rules: {
      required: "電話為必填",
      validate: (value: string) => {
        const regex = /^\d{8,12}$/;
        if (!regex.test(value)) {
          return "請輸入8位以上12位以下數字(e.g. 027777777)";
        }
        return true;
      },
    },
  },
  email: {
    key: CHECKOUT_INPUT_CLASSES.email,
    title: "信箱",
    rules: {
      required: "Email 為必填",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Email 格式不正確",
      },
    },
    type: GENERIC_INPUT_TYPES.email,
  },
  address: {
    key: CHECKOUT_INPUT_CLASSES.address,
    title: "地址",
    rules: {
      required: "地址為必填",
    },
  },
};
