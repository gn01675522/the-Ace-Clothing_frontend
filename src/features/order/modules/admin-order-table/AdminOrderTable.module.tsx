import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { AdminTable } from "../../../../modules";

import { setOrderEditModalOpenAndSetting } from "../../store/admin/adminOrder.slice";
import { selectAdminOrders } from "../../store/admin/adminOrder.selector";

import type { FC } from "react";
import type { IOrder } from "../../DTOs/adminOrders.dtos";

const tableColumns = [
  { header: "訂單 ID", accessor: "id" },
  { header: "用戶信箱", accessor: "email" },
  { header: "訂單金額", accessor: "total" },
  { header: "付款狀態", accessor: "is_paid" },
] as { header: string; accessor: keyof IOrder }[];

type PropsType = {
  onClickToOpenDeleteModal: (order: IOrder) => void;
};

export const AdminOrderTable: FC<PropsType> = ({
  onClickToOpenDeleteModal,
}) => {
  const orders = useAppSelector(selectAdminOrders);
  const dispatch = useAppDispatch();

  const orderForTable = orders.map((order) => ({
    ...order,
    email: order.user.email,
  }));

  const onClickToOpenModal = (order: IOrder) => {
    dispatch(setOrderEditModalOpenAndSetting(order));
  };

  return (
    <div className="admin-orders-table">
      <AdminTable<IOrder>
        data={orderForTable}
        columns={tableColumns}
        onClickToEditHandler={onClickToOpenModal}
        onClickToDeleteHandler={onClickToOpenDeleteModal}
      />
    </div>
  );
};
