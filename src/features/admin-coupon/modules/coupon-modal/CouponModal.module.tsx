import { useAdminCouponContext } from "../../hooks/admin-coupon.hooks";

import { ModalContainer } from "../../../../components/index";
import { AdminCouponModalHeader } from "../../components/admin-coupon-modal-header/AdminCouponModalHeader.component";
import { AdminCouponModalBody } from "../../components/admin-coupon-modal-body/AdminCouponModalBody.component";
import { AdminCouponModalFooter } from "../../components/admin-coupon-modal-footer/AdminCouponModalFooter.component";

import type { FC, MouseEvent } from "react";

import "./CouponModal.styles.scss";

export const CouponModal: FC = () => {
  const {
    modalControl: { switchModalOpen },
  } = useAdminCouponContext();

  const onClickHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) switchModalOpen();
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
