import { useCouponManagementContext } from "../../hooks/admin-coupon-modal.hooks";

import { FORM_OPERATION_OPTIONS } from "../../../../../../shared/types";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminCouponModalHeader.styles.scss";

export const AdminCouponModalHeader: FC = () => {
  const {
    onCloseHandler,
    formControl: { formData, type },
  } = useCouponManagementContext();

  const titleByType =
    type === FORM_OPERATION_OPTIONS.create
      ? "建立新優惠券"
      : `優惠券名稱： ${formData.form.title}`;

  return (
    <div className="admin-coupon-modal-header">
      <h1 className="coupon-modal__header__title">{titleByType}</h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={onCloseHandler}
      >
        ｘ
      </Button>
    </div>
  );
};
