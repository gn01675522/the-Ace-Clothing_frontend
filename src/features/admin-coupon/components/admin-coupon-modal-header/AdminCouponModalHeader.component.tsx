import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import type { FC, MouseEvent } from "react";
import type { AdminCouponWithId } from "../../DTOs/adminCoupon.dtos";
import type { AdminCouponFormType } from "../../types/admin-coupon.types";

type PropsType = {
  createOrEdit: "create" | "edit";
  formData: AdminCouponFormType | AdminCouponWithId;
  onClickToClose: (e: MouseEvent<HTMLElement>) => void;
};

export const AdminCouponModalHeader: FC<PropsType> = ({
  createOrEdit,
  formData,
  onClickToClose,
}) => {
  return (
    <div className="coupon-modal__header">
      <h1 className="coupon-modal__header-title">
        {createOrEdit === "create"
          ? "建立新優惠券"
          : `優惠券名稱： ${formData.title}`}
      </h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={onClickToClose}
      >
        ｘ
      </Button>
    </div>
  );
};
