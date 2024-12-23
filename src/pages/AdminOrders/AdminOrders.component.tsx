import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import Pagination from "../../components/Pagination/Pagination.component";
import OrderModal from "../../components/OrderModal/OrderModal.component";
import AdminTable from "../../components/AdminTable/AdminTable.component";
import DeleteModal, {
  DELETE_MODAL_TYPE,
} from "../../components/DeleteModal/DeleteModal.component";
import Loading from "../../components/Loading/Loading.component";

import { fetchAdminOrdersAsync } from "../../store/adminOrder/adminOrder.asyncThunk";
import {
  selectAdminOrders,
  selectAdminOrdersPagination,
  selectAdminOrdersIsLoading,
} from "../../store/adminOrder/adminOrder.selector";

import type { FC } from "react";
import type { Order } from "../../store/adminOrder/adminOrders.type";

import "./AdminOrders.styles.scss";

const tableColumns = [
  { header: "訂單 ID", accessor: "id" },
  { header: "用戶信箱", accessor: "email" },
  { header: "訂單金額", accessor: "total" },
  { header: "付款狀態", accessor: "is_paid" },
] as { header: string; accessor: keyof Order }[];

const AdminOrders: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetData, setTargetData] = useState<Order | null>(null);
  const [deleteTarget, setDeleteTarget] = useState({ id: "", title: "" });

  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectAdminOrders);
  const pagination = useAppSelector(selectAdminOrdersPagination);
  const isLoading = useAppSelector(selectAdminOrdersIsLoading);

  const onChangePageHandler = (page: number) => {
    dispatch(fetchAdminOrdersAsync(page));
  };

  const onClickIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const onClickToOpenModal = (type: "edit" | "create", order?: Order) => {
    if (order) setTargetData(order);
    setIsModalOpen(!isModalOpen);
  };

  //* 打開刪除 modal
  const onOpenOrdersDeleteModal = (order: Order) => {
    console.log("Test", order);
    setDeleteTarget({ id: order.id, title: order.id });
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAdminOrdersAsync());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="admin-orders">
        {isModalOpen && targetData && (
          <OrderModal
            targetData={targetData}
            backdropClose={onClickIsModalOpen}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            dataType={DELETE_MODAL_TYPE.adminOrder}
            id={deleteTarget.id}
            title={deleteTarget.title}
            closeAction={setIsDeleteModalOpen}
          />
        )}
        <h3 className="admin-orders__title">訂單列表</h3>
        <div className="admin-orders__content">
          <AdminTable
            data={orders}
            columns={tableColumns}
            onClickToEditHandler={onClickToOpenModal}
            onClickToDeleteHandler={onOpenOrdersDeleteModal}
          />
        </div>
        <div className="admin-orders__function">
          <Pagination
            currentPage={pagination?.current_page || 1}
            onChangePage={onChangePageHandler}
            pageCount={pagination?.total_pages || 1}
          />
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
