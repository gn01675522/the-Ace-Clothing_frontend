import { useCouponManagementContext } from "../../hooks/admin-coupon-modal.hooks";

import { GenericInput, ToggleSwitch } from "../../../../../../components/index";

import { adminCouponFormConfig } from "../../../../config/admin-coupon.config";

import type { FC } from "react";

import "./AdminCouponModalBody.styles.scss";

export const AdminCouponModalBody: FC = () => {
  const {
    formControl: {
      formData: { form },
      onChangeHandler,
    },
  } = useCouponManagementContext();

  const {
    couponIsEnabled,
    couponTitle,
    couponCode,
    couponPercent,
    couponDueDate,
  } = adminCouponFormConfig(form);

  return (
    <div className="admin-coupon-modal-body">
      <ToggleSwitch {...couponIsEnabled} onChange={onChangeHandler} />

      <div className="admin-coupon-modal-body__content">
        <GenericInput {...couponTitle} onChange={onChangeHandler} />
        <GenericInput {...couponCode} onChange={onChangeHandler} />
        <GenericInput {...couponPercent} onChange={onChangeHandler} />
        <GenericInput {...couponDueDate} onChange={onChangeHandler} />
      </div>
    </div>
  );
};
