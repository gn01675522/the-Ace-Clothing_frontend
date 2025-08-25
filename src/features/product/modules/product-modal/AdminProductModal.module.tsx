import { useAdminProductsContext } from "../../hooks/admin-products.hooks";

import { ModalContainer } from "../../../../components/index";

import { AdminProductModalHeader } from "./components/admin-product-modal-header/AdminProductModalHeader.component";
import { AdminProductModalDetails } from "./components/admin-product-modal-details/AdminProductModalDetails.component";
import { AdminProductModalDescription } from "./components/admin-product-modal-description/AdminProductModalDescription.component";
import { AdminProductModalToggleList } from "./components/admin-product-modal-toggle-list/AdminProductModalToggleList.component";
import { AdminProductModalFooter } from "./components/admin-product-modal-footer/AdminProductModalFooter.component";

import type { FC, MouseEvent } from "react";

import "./AdminProductModal.styles.scss";

export const AdminProductModal: FC = () => {
  const {
    modalControl: { switchAdminProductModalOpen },
  } = useAdminProductsContext();

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) switchAdminProductModalOpen();
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
