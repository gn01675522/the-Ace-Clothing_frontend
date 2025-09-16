import { Button, BUTTON_TYPE_CLASS } from "@/components";

import type { AdminProductDto } from "@/features/product";

export const mockDataTableData = [
  {
    id: "test id",
    title: "test title",
    category: "hat",
    origin_price: 2000,
    price: 1000,
    unit: "unit",
    num: 3,
    description: "test description",
    content: "test content",
    is_enabled: 1,
    imageUrl: "https://test.com",
    imagesUrl: ["https://test1.com", "https://test2.com"],
  },
] as AdminProductDto[];

export const mockDataTablePagination = (onChangePage: () => void) => ({
  currentPage: 1,
  pageCount: 1,
  onChangePage,
});

type ConfigPropsType = {
  onClickToEditHandler: (data: AdminProductDto) => void;
  onClickToDeleteHandler: (data: AdminProductDto) => void;
};

export const mockDataTableConfig = ({
  onClickToEditHandler,
  onClickToDeleteHandler,
}: ConfigPropsType) => ({
  headers: [
    { id: "category", render: "分類" },
    { id: "title", render: "名稱" },
    { id: "price", render: "售價" },
    { id: "is_enabled", render: "啟用狀態" },
    { id: "edit", render: "編輯" },
  ],

  columns: mockDataTableData.map((data) => ({
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
  })),
});
