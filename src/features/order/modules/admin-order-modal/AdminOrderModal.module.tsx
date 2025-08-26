import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { AdminOrderModalHeader } from "./components/admin-order-modal-header/AdminOrderModalHeader.component";
import { AdminOrderModalFooter } from "./components/admin-order-modal-footer/AdminOrderModalFooter.component";
import { AdminOrderModalList } from "./components/admin-order-modal-list/AdminOrderModalList.component";
import { AdminOrderModalDetails } from "./components/admin-order-modal-details/AdminOrderModalDetails.component";
import { ModalContainer } from "../../../../components/index";

import type { FC, MouseEvent } from "react";

export const AdminOrderModal: FC = () => {
  const {
    modalControl: { setIsModalOpen },
  } = useAdminOrderContext();

  const onClickToClose = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) setIsModalOpen(false);
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
