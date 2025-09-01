import { ProductManagementContextProvider } from "./contexts/admin-product-modal.contexts";

import { useProductManagementContext } from "./hooks/admin-product-modal.hooks";

import { ModalContainer } from "../../../../components/index";

import { AdminProductModalHeader } from "./components/admin-product-modal-header/AdminProductModalHeader.component";
import { AdminProductModalDetails } from "./components/admin-product-modal-details/AdminProductModalDetails.component";
import { AdminProductModalDescription } from "./components/admin-product-modal-description/AdminProductModalDescription.component";
import { AdminProductModalToggleList } from "./components/admin-product-modal-toggle-list/AdminProductModalToggleList.component";
import { AdminProductModalFooter } from "./components/admin-product-modal-footer/AdminProductModalFooter.component";

import type { FC, MouseEvent } from "react";

import "./AdminProductModal.styles.scss";

const AdminProductModalContent: FC = () => {
  const { onCloseHandler } = useProductManagementContext();

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) onCloseHandler();
  };

  return (
    <ModalContainer backdropClose={onClickToClose}>
      <div className="product-modal">
        <AdminProductModalHeader />
        <div className="product-modal__body">
          <AdminProductModalDetails />
          <AdminProductModalDescription />
          <div className="product-modal__body-lower">
            <h6 className="product-modal__body-lower-title">
              次要圖片(可多張)
            </h6>
            <AdminProductModalToggleList />
          </div>
        </div>
        <AdminProductModalFooter />
      </div>
    </ModalContainer>
  );
};

export const AdminProductModal: FC = () => {
  return (
    <ProductManagementContextProvider>
      <AdminProductModalContent />
    </ProductManagementContextProvider>
  );
};
