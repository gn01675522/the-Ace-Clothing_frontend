import { GENERIC_INPUT_TYPES } from "../../../../../components/index";

import { formatTimestampInMilliSeconds } from "../../../../../utils/common.utils";

import type { AdminCouponFormType } from "../../../types/admin-coupon.types";

export const adminCouponFormConfig = (formData: AdminCouponFormType) => ({
  couponIsEnabled: {
    id: "is_enabled",
    name: "is_enabled",
    title: "是否啟用",
    checked: !!formData?.is_enabled,
  },
  couponTitle: {
    id: "title",
    name: "title",
    type: GENERIC_INPUT_TYPES.text,
    title: "標題",
    value: formData.title,
    placeholder: "請輸入標題",
  },
  couponCode: {
    id: "code",
    name: "code",
    type: GENERIC_INPUT_TYPES.text,
    title: "優惠碼",
    value: formData.code,
    placeholder: "請輸入優惠碼",
  },
  couponPercent: {
    id: "percent",
    name: "percent",
    type: GENERIC_INPUT_TYPES.number,
    title: "折扣(e.g: 8折 = 80)",
    value: formData.percent,
  },
  couponDueDate: {
    id: "due_date",
    name: "due_date",
    type: GENERIC_INPUT_TYPES.date,
    title: "到期日",
    value: formatTimestampInMilliSeconds(formData.due_date),
    placeholder: "請輸入到期日",
  },
});

export const defaultCouponFormStructure: AdminCouponFormType = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
  code: "testCode",
  num: 1,
};
