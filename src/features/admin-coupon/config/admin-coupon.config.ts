import { formatTimestampInMilliSeconds } from "../../../utils/common.utils";

import type { ReactNode } from "react";

import type { IGetAdminCoupon } from "../DTOs/adminCoupon.dtos";

export const adminCouponFormConfig = [
  { id: "title", type: "text", title: "標題" },
  { id: "code", type: "text", title: "優惠碼" },
  { id: "percent", type: "number", title: "折扣(e.g: 8折 = 80)" },
  { id: "due_date", type: "date", title: "到期日" },
];

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
