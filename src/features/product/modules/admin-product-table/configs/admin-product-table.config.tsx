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
    { id: "name", render: "名稱" },
    { id: "edit", render: "編輯" },
  ];

  const columns = adminProductData.map((data) => ({
    id: data._id,
    data: [
      { id: "1", render: () => data.category.value },
      { id: "2", render: () => data.name },
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
