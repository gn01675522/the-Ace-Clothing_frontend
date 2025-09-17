import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";

import { DataTable } from "@/modules/index";

import { setOrderEditModalOpenAndSetting } from "../../store/admin/adminOrder.slice";
import { fetchAdminOrdersAsync } from "../../store/admin/adminOrder.asyncThunk";
import {
  selectAdminOrders,
  selectAdminOrdersPagination,
} from "../../store/admin/adminOrder.selector";

import { adminOrderTableConfig } from "./config/admin-order-table.config";

import type { FC } from "react";
import type { AdminOrderDto } from "../../DTOs/adminOrders.dtos";

import "./AdminOrderTable.styles.scss";

type PropsType = {
  onClickToOpenDeleteModal: (order: AdminOrderDto) => void;
};

export const AdminOrderTable: FC<PropsType> = ({
  onClickToOpenDeleteModal,
}) => {
  const orders = useAppSelector(selectAdminOrders);
  const pagination = useAppSelector(selectAdminOrdersPagination);

  const dispatch = useAppDispatch();

  const paginationAction = {
    currentPage: pagination?.current_page || 1,
    pageCount: pagination?.total_pages || 1,
    onChangePage: (page: number) => dispatch(fetchAdminOrdersAsync(page)),
  };

  const onClickToOpenModal = (order: AdminOrderDto) => {
    dispatch(setOrderEditModalOpenAndSetting(order));
  };

  const tableConfig = adminOrderTableConfig({
    orderData: orders,
    onClickToDeleteHandler: onClickToOpenDeleteModal,
    onClickToEditHandler: onClickToOpenModal,
  });

  return (
    <DataTable
      config={tableConfig}
      actionControl={{ pagination: paginationAction }}
    />
  );
};
