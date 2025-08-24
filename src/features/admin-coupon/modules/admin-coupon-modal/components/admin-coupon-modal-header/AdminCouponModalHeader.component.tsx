import { useAdminCouponContext } from "../../../../hooks/admin-coupon.hooks";
import { ADMIN_COUPON_FORM_CLASSES } from "../../../../types/admin-coupon.types";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminCouponModalHeader.styles.scss";

export const AdminCouponModalHeader: FC = () => {
  const {
    formControl: { formData, createOrEdit },
    closeModalAndClearForm,
  } = useAdminCouponContext();

  const titleByType =
    createOrEdit === ADMIN_COUPON_FORM_CLASSES.create
      ? "建立新優惠券"
      : `優惠券名稱： ${formData.form.title}`;

  return (
    <div className="admin-coupon-modal-header">
      <h1 className="coupon-modal__header__title">{titleByType}</h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={closeModalAndClearForm}
      >
        ｘ
      </Button>
    </div>
  );
};
