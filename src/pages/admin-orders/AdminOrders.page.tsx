import {
  DeleteModal,
  DELETE_MODAL_TYPE,
  useDeleteModalControl,
} from "@/modules";

import { Loading } from "@/components";

import {
  useAdminOrderStateFetch,
  AdminOrderModal,
  AdminOrderTable,
  type AdminOrderDto,
} from "@/features/order/index";

import type { FC } from "react";

import "./AdminOrders.styles.scss";

const AdminOrders: FC = () => {
  const { isLoading, isOrderEditModalOpen } = useAdminOrderStateFetch();
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
          dataType={DELETE_MODAL_TYPE.adminOrder}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <h3 className="admin-orders__title">訂單列表</h3>
      <AdminOrderTable onClickToOpenDeleteModal={onClickToOpenDeleteModal} />
    </div>
  );
};

export default AdminOrders;
