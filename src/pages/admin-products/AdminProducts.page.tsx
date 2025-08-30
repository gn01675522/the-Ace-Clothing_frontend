import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteModalControl } from "../../modules/index";

import { useAdminProductStateFetch } from "../../features/product/index";

import { Loading } from "../../components/index";

import {
  AdminProductModal,
  AdminProductTable,
  AdminProductPagination,
} from "../../features/product/index";

import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules/index";

import type { FC } from "react";
import type { IGetAdminProduct } from "../../features/product/DTOs/adminProduct.types";

import "./AdminProducts.styles.scss";

const AdminProducts: FC = () => {
  const { category } = useParams();
  const { isLoading } = useAdminProductStateFetch(category);

  const {
    isDeleteModalOpen,
    switchDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
  } = useDeleteModalControl();
  //todo 待後端完成需重構 pagination 部分
  const [currentPage, setCurrentPage] = useState(1);

  //* 打開刪除 modal
  const onClickToDeleteProductHandler = (target: IGetAdminProduct) => {
    setDeleteTarget({ id: target.id, title: target.title });
    switchDeleteModalOpen;
  };

  return (
    <div className="admin-products">
      <AdminProductModal />
      {isLoading && <Loading />}
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminProduct}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <h3 className="admin-products__title">
        產品列表-{category?.toUpperCase()}
      </h3>
      <AdminProductTable
        onClickDeleteHandler={onClickToDeleteProductHandler}
        currentPage={currentPage}
      />
      <AdminProductPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AdminProducts;
