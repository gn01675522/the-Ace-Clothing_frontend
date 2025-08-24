import { useAdminProductsContext } from "../../hooks/adminProducts.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { AdminTable } from "../../../../modules";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { FC } from "react";
import type { AdminProduct } from "../../DTOs/adminProduct.types";

const tableColumns = [
  { header: "分類", accessor: "category" },
  { header: "名稱", accessor: "title" },
  { header: "售價", accessor: "price" },
  { header: "啟用狀態", accessor: "is_enabled" },
] as { header: string; accessor: keyof AdminProduct }[];

type PropsType = {
  onClickToDeleteProductHandler: (target: AdminProduct) => void;
  currentPage: number;
};

export const AdminProductTable: FC<PropsType> = ({
  onClickToDeleteProductHandler,
  currentPage,
}) => {
  const {
    formControl: { setCreateOrEdit, setTargetData },
    stateFetch: { products },
    modalControl: { switchAdminProductModalOpen },
  } = useAdminProductsContext();

  //* 根據目前哪一頁來決定來決定要顯示哪筆產品，10 筆資料一頁
  const productsInPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 10,
    currentPage * 10
  );

  const onClickToCreateHandler = () => {
    setCreateOrEdit(FORM_OPERATION_OPTIONS.create);
    switchAdminProductModalOpen();
  };

  const onClickToEditHandler = (product: AdminProduct) => {
    setCreateOrEdit(FORM_OPERATION_OPTIONS.edit);
    setTargetData(product);
    switchAdminProductModalOpen();
  };

  return (
    <>
      <div className="admin-products__actions">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
          onClick={onClickToCreateHandler}
        >
          建立新商品
        </Button>
      </div>
      <AdminTable
        data={productsInPage}
        columns={tableColumns}
        onClickToEditHandler={onClickToEditHandler}
        onClickToDeleteHandler={onClickToDeleteProductHandler}
      />
    </>
  );
};
