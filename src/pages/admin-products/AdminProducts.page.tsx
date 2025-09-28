import { DeleteModal, useDeleteModalControl } from "@/modules";

import { Loading } from "@/components";

import {
  AdminProductModal,
  AdminProductTable,
  useAdminProductStateFetch,
  useAdminProductActionControl,
  type AdminProductDto,
} from "@/features/product";

import type { FC } from "react";

import "./AdminProducts.styles.scss";

const AdminProducts: FC = () => {
  const { isLoading, isProductEditModalOpen } = useAdminProductStateFetch();
  const { deleteProductAction } = useAdminProductActionControl();

  const {
    isDeleteModalOpen,
    switchDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
  } = useDeleteModalControl();

  //* 打開刪除 modal
  const onClickToDeleteProductHandler = (target: AdminProductDto) => {
    setDeleteTarget({ id: target._id, title: target.name });
    switchDeleteModalOpen();
  };

  return (
    <div className="admin-products">
      {isLoading && <Loading />}
      {isProductEditModalOpen && <AdminProductModal />}
      {isDeleteModalOpen && (
        <DeleteModal
          id={deleteTarget.id}
          title={deleteTarget.title}
          actionControl={{
            closeAction: switchDeleteModalOpen,
            deleteAction: deleteProductAction,
          }}
        />
      )}
      <h3 className="admin-products__title">產品列表</h3>
      <AdminProductTable onClickDeleteHandler={onClickToDeleteProductHandler} />
    </div>
  );
};

export default AdminProducts;
