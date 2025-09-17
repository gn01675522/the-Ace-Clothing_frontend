import { useState } from "react";
import { useParams } from "react-router-dom";

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
  //todo 待後端完成需重構 pagination 部分
  const [currentPage, setCurrentPage] = useState(1);

  const { category } = useParams();
  const { isLoading, isProductEditModalOpen } =
    useAdminProductStateFetch(category);
  const { deleteProductAction } = useAdminProductActionControl();

  const {
    isDeleteModalOpen,
    switchDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
  } = useDeleteModalControl();

  //* 打開刪除 modal
  const onClickToDeleteProductHandler = (target: AdminProductDto) => {
    setDeleteTarget({ id: target.id, title: target.title });
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
      <h3 className="admin-products__title">
        產品列表-{category?.toUpperCase()}
      </h3>
      <AdminProductTable
        onClickDeleteHandler={onClickToDeleteProductHandler}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AdminProducts;
