import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { DataTable } from "@/modules/index";

import {
  setProductEditModalIsOpen,
  setProductEditModalType,
  setProductEditModalTargetData,
} from "../../store/admin/adminProduct.slice";

import { adminProductTableConfig } from "./configs/admin-product-table.config";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";
import { fetchAdminProductAsync } from "../../store/admin/adminProduct.asyncThunk";
import {
  selectAdminProducts,
  selectAdminProductPagination,
} from "../../store/admin/adminProduct.selector";

import type { FC } from "react";
import type { AdminProductDto } from "../../DTOs/adminProduct.dtos";

import "./AdminProductTable.styles.scss";

type PropsType = {
  onClickDeleteHandler: (target: AdminProductDto) => void;
};

export const AdminProductTable: FC<PropsType> = ({ onClickDeleteHandler }) => {
  const products = useAppSelector(selectAdminProducts);
  const pagination = useAppSelector(selectAdminProductPagination);

  const dispatch = useAppDispatch();

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
    adminProductData: products,
    onClickToEditHandler,
    onClickToDeleteHandler: onClickDeleteHandler,
  });

  const paginationAction = {
    currentPage: pagination.current_page,
    pageCount: pagination.total_pages,
    onChangePage: (page: number) =>
      dispatch(fetchAdminProductAsync({ current_page: page })),
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
