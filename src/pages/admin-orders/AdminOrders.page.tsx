import { useDeleteModalControl } from "../../modules";

import { Loading } from "../../components";

import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules";

import {
  useAdminOrderStateFetch,
  AdminOrderModal,
} from "../../features/order/index";

import {
  AdminOrderPagination,
  AdminOrderTable,
  type AdminOrderDto,
} from "../../features/order/index";

import type { FC } from "react";

import "./AdminOrders.styles.scss";

const AdminOrders: FC = () => {
  const { isLoading } = useAdminOrderStateFetch();
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
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminOrder}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <AdminOrderModal />
      <h3 className="admin-orders__title">訂單列表</h3>
      <AdminOrderTable onClickToOpenDeleteModal={onClickToOpenDeleteModal} />

      <AdminOrderPagination />
    </div>
  );
};

export default AdminOrders;
