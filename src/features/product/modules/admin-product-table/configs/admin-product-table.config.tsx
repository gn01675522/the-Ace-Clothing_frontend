import { Button, BUTTON_TYPE_CLASS } from "@/components";

import type { AdminProductDto } from "../../../DTOs/adminProduct.dtos";
import type { DataTableConfig } from "@/modules/data-table/types/data-table.types";

type ConfigPropsType = {
  adminProductData: AdminProductDto[];
  onClickToEditHandler: (data: AdminProductDto) => void;
  onClickToDeleteHandler: (data: AdminProductDto) => void;
};

export const adminProductTableConfig = ({
  adminProductData,
  onClickToEditHandler,
  onClickToDeleteHandler,
}: ConfigPropsType): DataTableConfig => {
  if (!adminProductData) return { headers: [], columns: [] };

  const headers = [
    { id: "category", render: "分類" },
    { id: "title", render: "名稱" },
    { id: "price", render: "售價" },
    { id: "is_enabled", render: "啟用狀態" },
    { id: "edit", render: "編輯" },
  ];

  const columns = adminProductData.map((data) => ({
    id: data.id,
    data: [
      { id: "1", render: () => data.category },
      { id: "2", render: () => data.title },
      { id: "3", render: () => data.price },
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
