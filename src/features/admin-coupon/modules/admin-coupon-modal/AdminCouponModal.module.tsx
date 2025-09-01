import { CouponManagementContextProvider } from "./contexts/admin-coupon-modal.context";
import { useCouponManagementContext } from "./hooks/admin-coupon-modal.hooks";

import { ModalContainer } from "../../../../components/index";
import { AdminCouponModalHeader } from "./components/admin-coupon-modal-header/AdminCouponModalHeader.component";
import { AdminCouponModalBody } from "./components/admin-coupon-modal-body/AdminCouponModalBody.component";
import { AdminCouponModalFooter } from "./components/admin-coupon-modal-footer/AdminCouponModalFooter.component";

import type { FC, MouseEvent } from "react";

const AdminCouponModalContent: FC = () => {
  const { onCloseHandler } = useCouponManagementContext();

  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) onCloseHandler();
  };

  return (
    <ModalContainer backdropClose={onClickHandler}>
      <div className="coupon-modal">
        <AdminCouponModalHeader />
        <AdminCouponModalBody />
        <AdminCouponModalFooter />
      </div>
    </ModalContainer>
  );
};

export const AdminCouponModal: FC = () => {
  return (
    <CouponManagementContextProvider>
      <AdminCouponModalContent />
    </CouponManagementContextProvider>
  );
};
