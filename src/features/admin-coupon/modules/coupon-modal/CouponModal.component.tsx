import { useAdminCouponForm } from "../../hooks/admin-coupon.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";
import { ModalContainer } from "../../../../components/index";
import { AdminCouponModalHeader } from "../../components/admin-coupon-modal-header/AdminCouponModalHeader.component";
import { AdminCouponModalBody } from "../../components/admin-coupon-modal-body/AdminCouponModalBody.component";
import { AdminCouponModalFooter } from "../../components/admin-coupon-modal-footer/AdminCouponModalFooter.component";

import type { FC, Dispatch, SetStateAction } from "react";
import type { AdminCoupon } from "../../DTOs/adminCoupon.dtos";

import "./CouponModal.styles.scss";

type PropsType = {
  targetData: AdminCoupon | null;
  createOrEdit: "create" | "edit";
  backdropClose: Dispatch<SetStateAction<boolean>>;
};

export const CouponModal: FC<PropsType> = ({
  createOrEdit,
  targetData,
  backdropClose,
}) => {
  const { formData, onClickToClose, onChangeHandler, onSubmitHandler } =
    useAdminCouponForm({
      type: createOrEdit,
      targetData,
      backdropClose,
    });

  return (
    <ModalContainer backdropClose={onClickToClose}>
      <div className="coupon-modal">
        <AdminCouponModalHeader
          createOrEdit={createOrEdit}
          formData={formData}
          onClickToClose={onClickToClose}
        />
        <AdminCouponModalBody
          onChangeHandler={onChangeHandler}
          formData={formData}
        />
        <AdminCouponModalFooter
          onClickToClose={onClickToClose}
          onSubmitHandler={onSubmitHandler}
          formData={formData}
        />
      </div>
    </ModalContainer>
  );
};
