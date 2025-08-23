import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { AdminTable } from "../../../../modules";

import type { FC } from "react";
import type { Order } from "../../DTOs/adminOrders.dtos";

const tableColumns = [
  { header: "訂單 ID", accessor: "id" },
  { header: "用戶信箱", accessor: "email" },
  { header: "訂單金額", accessor: "total" },
  { header: "付款狀態", accessor: "is_paid" },
] as { header: string; accessor: keyof Order }[];

type PropsType = {
  onClickToOpenDeleteModal: (order: Order) => void;
};

export const AdminOrderTable: FC<PropsType> = ({
  onClickToOpenDeleteModal,
}) => {
  const {
    stateFetch: { orders },
    formControl: { setTargetData },
    modalControl: { switchAdminOrderModalOpen },
  } = useAdminOrderContext();

  const orderForTable = orders.map((order) => ({
    ...order,
    email: order.user.email,
  }));

  const onClickToOpenModal = (order: Order) => {
    setTargetData(order);
    switchAdminOrderModalOpen();
  };

  return (
    <div className="admin-orders-table">
      <AdminTable<Order>
        data={orderForTable}
        columns={tableColumns}
        onClickToEditHandler={onClickToOpenModal}
        onClickToDeleteHandler={onClickToOpenDeleteModal}
      />
    </div>
  );
};
