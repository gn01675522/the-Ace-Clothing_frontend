import { Button, BUTTON_TYPE_CLASS } from "@/components";

import type { AdminOrderDto } from "../../../DTOs/adminOrders.dtos";
import type { DataTableConfig } from "@/modules/data-table/types/data-table.types";

type ConfigPropsType = {
  orderData: AdminOrderDto[];
  onClickToEditHandler: (data: AdminOrderDto) => void;
  onClickToDeleteHandler: (data: AdminOrderDto) => void;
};

export const adminOrderTableConfig = ({
  orderData,
  onClickToEditHandler,
  onClickToDeleteHandler,
}: ConfigPropsType): DataTableConfig => {
  if (!orderData) return { headers: [], columns: [] };

  const headers = [
    { id: "id", render: "訂單 ID" },
    { id: "email", render: "用戶信箱" },
    { id: "total", render: "訂單金額" },
    { id: "is_paid", render: "付款狀態" },
    { id: "edit", render: "編輯" },
  ];

  const columns = orderData.map((data) => ({
    id: data.id,
    data: [
      { id: "1", render: () => data.id },
      { id: "2", render: () => data.user.email },
      { id: "3", render: () => data.total },
      { id: "4", render: () => (data.is_paid ? "已付款" : "未付款") },
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
