import { DeleteModal, useDeleteModalControl } from "@/modules";

import { Loading } from "@/components";

import {
  AdminOrderModal,
  AdminOrderTable,
  useAdminOrderStateFetch,
  useAdminOrderActionControl,
  type AdminOrderDto,
} from "@/features/order";

import type { FC } from "react";

import "./AdminOrders.styles.scss";

const AdminOrders: FC = () => {
  const { isLoading, isOrderEditModalOpen } = useAdminOrderStateFetch();
  const { deleteOrderAction } = useAdminOrderActionControl();

  const {
    deleteTarget,
    isDeleteModalOpen,
    setDeleteTarget,
    switchDeleteModalOpen,
  } = useDeleteModalControl();

  //* 打開刪除 modal
  const onClickToOpenDeleteModal = (order: AdminOrderDto) => {
    setDeleteTarget({ id: order.id, title: order.id });
    switchDeleteModalOpen();
  };

  return (
    <div className="admin-orders">
      {isLoading && <Loading />}
      {isOrderEditModalOpen && <AdminOrderModal />}
      {isDeleteModalOpen && (
        <DeleteModal
          id={deleteTarget.id}
          title={deleteTarget.title}
          actionControl={{
            closeAction: switchDeleteModalOpen,
            deleteAction: deleteOrderAction,
          }}
        />
      )}
      <h3 className="admin-orders__title">訂單列表</h3>
      <AdminOrderTable onClickToOpenDeleteModal={onClickToOpenDeleteModal} />
    </div>
  );
};

export default AdminOrders;
