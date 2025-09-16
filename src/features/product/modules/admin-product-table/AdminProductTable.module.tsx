import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { DataTable } from "@/modules/index";

import {
  setProductEditModalIsOpen,
  setProductEditModalType,
  setProductEditModalTargetData,
} from "../../store/admin/adminProduct.slice";
import { classifyAdminProducts } from "../../store/admin/adminProduct.selector";

import { adminProductTableConfig } from "./configs/admin-product-table.config";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { FC, Dispatch, SetStateAction } from "react";
import type { AdminProductDto } from "../../DTOs/adminProduct.dtos";

import "./AdminProductTable.styles.scss";

type PropsType = {
  onClickDeleteHandler: (target: AdminProductDto) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const AdminProductTable: FC<PropsType> = ({
  onClickDeleteHandler,
  currentPage,
  setCurrentPage,
}) => {
  const { category } = useParams();

  const products = useAppSelector(classifyAdminProducts(category || ""));

  const dispatch = useAppDispatch();

  const pageCount = Math.ceil(products.length / 10) || 1;

  //* 根據目前哪一頁來決定來決定要顯示哪筆產品，10 筆資料一頁
  const productsInPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 10,
    currentPage * 10
  );

  const onChangePage = (page: number) => setCurrentPage(page);

  const onClickToCreateHandler = () => {
    dispatch(setProductEditModalType(FORM_OPERATION_OPTIONS.create));
    dispatch(setProductEditModalIsOpen(true));
  };

  const onClickToEditHandler = (product: AdminProductDto) => {
    dispatch(setProductEditModalType(FORM_OPERATION_OPTIONS.edit));
    dispatch(setProductEditModalTargetData(product));
    dispatch(setProductEditModalIsOpen(true));
  };

  const tableConfig = adminProductTableConfig({
    adminProductData: productsInPage,
    onClickToEditHandler,
    onClickToDeleteHandler: onClickDeleteHandler,
  });

  const paginationAction = {
    currentPage,
    pageCount,
    onChangePage,
  };

  return (
    <>
      <div className="admin-product-table">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
          onClick={onClickToCreateHandler}
        >
          建立新商品
        </Button>
      </div>
      <DataTable
        config={tableConfig}
        actionControl={{ pagination: paginationAction }}
      />
    </>
  );
};
