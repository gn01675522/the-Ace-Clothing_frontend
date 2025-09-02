import { formatTimestampInMilliSeconds } from "../../../../../utils/common.utils";

import type { ReactNode } from "react";
import type { AdminCouponDto } from "../../../DTOs/adminCoupon.dtos";

export const adminCouponTableColumn: Array<{
  header: string;
  accessor: keyof AdminCouponDto;
  render?: (value: AdminCouponDto[keyof AdminCouponDto]) => ReactNode;
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
