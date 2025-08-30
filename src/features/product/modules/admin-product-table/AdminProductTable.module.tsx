import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { AdminTable } from "../../../../modules";

import {
  setProductEditModalIsOpen,
  setProductEditModalType,
  setProductEditModalTargetData,
} from "../../store/admin/adminProduct.slice";
import { classifyAdminProducts } from "../../store/admin/adminProduct.selector";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { FC } from "react";
import type { IGetAdminProduct } from "../../DTOs/adminProduct.types";

const tableColumns = [
  { header: "分類", accessor: "category" },
  { header: "名稱", accessor: "title" },
  { header: "售價", accessor: "price" },
  { header: "啟用狀態", accessor: "is_enabled" },
] as { header: string; accessor: keyof IGetAdminProduct }[];

type PropsType = {
  onClickDeleteHandler: (target: IGetAdminProduct) => void;
  currentPage: number;
};

export const AdminProductTable: FC<PropsType> = ({
  onClickDeleteHandler,
  currentPage,
}) => {
  const { category } = useParams();
  const products = useAppSelector(classifyAdminProducts(category || ""));

  const dispatch = useAppDispatch();

  //* 根據目前哪一頁來決定來決定要顯示哪筆產品，10 筆資料一頁
  const productsInPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 10,
    currentPage * 10
  );

  const onClickToCreateHandler = () => {
    dispatch(setProductEditModalType(FORM_OPERATION_OPTIONS.create));
    dispatch(setProductEditModalIsOpen(true));
  };

  const onClickToEditHandler = (product: IGetAdminProduct) => {
    dispatch(setProductEditModalType(FORM_OPERATION_OPTIONS.edit));
    dispatch(setProductEditModalTargetData(product));
    dispatch(setProductEditModalIsOpen(true));
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
        onClickToDeleteHandler={onClickDeleteHandler}
      />
    </>
  );
};
