import { useAppSelector } from "../../../../store/redux-hooks";

import { CouponManagementContextProvider } from "./contexts/admin-coupon-modal.context";
import { useCouponManagementContext } from "./hooks/admin-coupon-modal.hooks";

import { ModalContainer } from "../../../../components/index";
import { AdminCouponModalHeader } from "./components/admin-coupon-modal-header/AdminCouponModalHeader.component";
import { AdminCouponModalBody } from "./components/admin-coupon-modal-body/AdminCouponModalBody.component";
import { AdminCouponModalFooter } from "./components/admin-coupon-modal-footer/AdminCouponModalFooter.component";

import { selectAdminCouponsEditModalIsOpen } from "../../store/adminCoupon.selector";

import type { FC, MouseEvent } from "react";

const AdminCouponModalContent: FC = () => {
  const { closeModalAndClearForm } = useCouponManagementContext();

  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeModalAndClearForm();
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
  const isOpen = useAppSelector(selectAdminCouponsEditModalIsOpen);
  if (!isOpen) return;

  return (
    <CouponManagementContextProvider>
      <AdminCouponModalContent />
    </CouponManagementContextProvider>
  );
};
