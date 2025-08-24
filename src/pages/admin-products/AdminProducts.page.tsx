import { useState } from "react";
import { useDeleteModalControl } from "../../modules/index";

import {
  AdminProductsContextProvider,
  useAdminProductsContext,
} from "../../features/product/index";

import {
  AdminProductsModalOverlay,
  AdminProductTable,
  AdminProductPagination,
} from "../../features/product/index";

import { DeleteModal, DELETE_MODAL_TYPE } from "../../modules/index";

import type { FC } from "react";
import type { AdminProduct } from "../../features/product/DTOs/adminProduct.types";

import "./AdminProducts.styles.scss";

const AdminProductsContent: FC = () => {
  const { pageCategory } = useAdminProductsContext();
  const {
    isDeleteModalOpen,
    switchDeleteModalOpen,
    deleteTarget,
    setDeleteTarget,
  } = useDeleteModalControl();
  //todo 待後端完成需重構此部分
  const [currentPage, setCurrentPage] = useState(1);

  //* 打開刪除 modal
  const onClickToDeleteProductHandler = (target: AdminProduct) => {
    setDeleteTarget({ id: target.id, title: target.title });
    switchDeleteModalOpen;
  };

  return (
    <>
      <AdminProductsModalOverlay />
      {isDeleteModalOpen && (
        <DeleteModal
          dataType={DELETE_MODAL_TYPE.adminProduct}
          id={deleteTarget.id}
          title={deleteTarget.title}
          closeAction={switchDeleteModalOpen}
        />
      )}
      <div className="admin-products">
        <h3 className="admin-products__title">
          產品列表-{pageCategory?.toUpperCase()}
        </h3>
        <AdminProductTable
          onClickToDeleteProductHandler={onClickToDeleteProductHandler}
          currentPage={currentPage}
        />
        <AdminProductPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

const AdminProducts: FC = () => {
  return (
    <AdminProductsContextProvider>
      <AdminProductsContent />
    </AdminProductsContextProvider>
  );
};

export default AdminProducts;
