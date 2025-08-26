import { useDeleteModalControl } from "../../modules";

import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules";

import { AdminOrderContextProvider } from "../../features/order/index";

import {
  AdminOrderOverlay,
  AdminOrderPagination,
  AdminOrderTable,
  type Order,
} from "../../features/order/index";

import type { FC } from "react";

import "./AdminOrders.styles.scss";

const AdminOrdersContent: FC = () => {
  const {
    deleteTarget,
    isDeleteModalOpen,
    setDeleteTarget,
    switchDeleteModalOpen,
  } = useDeleteModalControl();

  //* 打開刪除 modal
  const onClickToOpenDeleteModal = (order: Order) => {
    setDeleteTarget({ id: order.id, title: order.id });
    switchDeleteModalOpen();
  };

  return (
    <>
      <AdminOrderOverlay />
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminOrder}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <div className="admin-orders">
        <h3 className="admin-orders__title">訂單列表</h3>
        <AdminOrderTable onClickToOpenDeleteModal={onClickToOpenDeleteModal} />

        <AdminOrderPagination />
      </div>
    </>
  );
};

const AdminOrders: FC = () => {
  return (
    <AdminOrderContextProvider>
      <AdminOrdersContent />
    </AdminOrderContextProvider>
  );
};

export default AdminOrders;
