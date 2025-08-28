import { formatTimestampInMilliSeconds } from "../../../utils/common.utils";

import { GENERIC_INPUT_TYPES } from "../../../components/index";

import type { ReactNode } from "react";
import type { IGetAdminCoupon } from "../DTOs/adminCoupon.dtos";
import type { AdminCouponFormType } from "../types/admin-coupon.types";

export const adminCouponFormConfig = (formData: AdminCouponFormType) => ({
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
    name: "title",
    type: GENERIC_INPUT_TYPES.text,
    title: "優惠碼",
    value: formData.code,
    placeholder: "請輸入優惠碼",
  },
  couponPercent: {
    id: "percent",
    name: "title",
    type: GENERIC_INPUT_TYPES.number,
    title: "折扣(e.g: 8折 = 80)",
    value: formData.percent,
  },
  couponDueDate: {
    id: "due_date",
    name: "title",
    type: GENERIC_INPUT_TYPES.date,
    title: "到期日",
    value: formatTimestampInMilliSeconds(formData.due_date),
    placeholder: "請輸入到期日",
  },
});

export const adminCouponTableColumn: Array<{
  header: string;
  accessor: keyof IGetAdminCoupon;
  render?: (value: IGetAdminCoupon[keyof IGetAdminCoupon]) => ReactNode;
}> = [
  { header: "優惠碼", accessor: "code" },
  { header: "折扣", accessor: "percent" },
  {
    header: "到期日",
    accessor: "due_date",
    render: (value) => formatTimestampInMilliSeconds(value),
  },
  { header: "啟用狀態", accessor: "is_enabled" },
];

export const defaultCouponCreateData: AdminCouponFormType = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: formatTimestampInMilliSeconds(new Date()),
  code: "testCode",
  num: 1,
};
