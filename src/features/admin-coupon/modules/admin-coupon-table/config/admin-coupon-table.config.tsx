import { Button, BUTTON_TYPE_CLASS } from "@/components";

import { formatTimestampInMilliSeconds } from "@/utils/common.utils";

import type { AdminCouponDto } from "../../../DTOs/adminCoupon.dtos";
import type { DataTableConfig } from "@/modules/data-table/types/data-table.types";

type ConfigPropsType = {
  couponData: AdminCouponDto[];
  onClickToEditHandler: (data: AdminCouponDto) => void;
  onClickToDeleteHandler: (data: AdminCouponDto) => void;
};

export const adminCouponTableConfig = ({
  couponData,
  onClickToEditHandler,
  onClickToDeleteHandler,
}: ConfigPropsType): DataTableConfig => {
  if (!couponData) return { headers: [], columns: [] };

  const headers = [
    { id: "code", render: "優惠碼" },
    { id: "percent", render: "折扣" },
    { id: "due_date", render: "到期日" },
    { id: "is_enabled", render: "啟用狀態" },
    { id: "edit", render: "編輯" },
  ];

  const columns = couponData.map((data) => ({
    id: data.id,
    data: [
      { id: "1", render: () => data.code },
      { id: "2", render: () => data.percent },
      { id: "3", render: () => formatTimestampInMilliSeconds(data.due_date) },
      { id: "4", render: () => (data.is_enabled ? "已啟用" : "未啟用") },
      {
        id: "5",
        render: () => (
          <div className="admin-order-table__edit">
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
              onClick={() => onClickToEditHandler(data)}
            >
              編輯
            </Button>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
              onClick={() => onClickToDeleteHandler(data)}
            >
              刪除
            </Button>
          </div>
        ),
      },
    ],
  }));

  return { headers, columns };
};
