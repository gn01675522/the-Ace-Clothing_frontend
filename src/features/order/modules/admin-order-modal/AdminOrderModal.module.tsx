import { OrderManagementContextProvider } from "./contexts/admin-order-modal.contexts";
import { useOrderManagementContext } from "./hooks/admin-order-modal.hooks";

import { ModalContainer } from "../../../../components/index";
import { AdminOrderModalHeader } from "./components/admin-order-modal-header/AdminOrderModalHeader.component";
import { AdminOrderModalFooter } from "./components/admin-order-modal-footer/AdminOrderModalFooter.component";
import { AdminOrderModalList } from "./components/admin-order-modal-list/AdminOrderModalList.component";
import { AdminOrderModalDetails } from "./components/admin-order-modal-details/AdminOrderModalDetails.component";

import type { FC, MouseEvent } from "react";

const AdminOrderModalContent: FC = () => {
  const { closeModalAndClearForm } = useOrderManagementContext();

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModalAndClearForm();
  };

  return (
    <ModalContainer backdropClose={onClickToClose}>
      <div className="order-modal">
        <AdminOrderModalHeader />
        <div className="order-modal__body">
          <AdminOrderModalDetails />
          <AdminOrderModalList />
        </div>
        <AdminOrderModalFooter />
      </div>
    </ModalContainer>
  );
};

export const AdminOrderModal: FC = () => {
  return (
    <OrderManagementContextProvider>
      <AdminOrderModalContent />
    </OrderManagementContextProvider>
  );
};
