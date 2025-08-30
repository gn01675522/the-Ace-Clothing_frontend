import { useCouponManagementContext } from "../../hooks/admin-coupon-modal.hooks";

import { GenericInput } from "../../../../../../components/index";

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

  const { couponTitle, couponCode, couponPercent, couponDueDate } =
    adminCouponFormConfig(form);

  return (
    <div className="admin-coupon-modal-body">
      <div className="admin-coupon-modal-body__check">
        <label
          className="admin-coupon-modal-body__check-label"
          htmlFor="is_enabled"
        >
          是否啟用
        </label>
        <input
          className="admin-coupon-modal-body__check-input"
          type="checkbox"
          id="is_enabled"
          name="is_enabled"
          checked={!!form.is_enabled}
          onChange={onChangeHandler}
        />
      </div>

      <div className="admin-coupon-modal-body__content">
        <GenericInput {...couponTitle} onChange={onChangeHandler} />
        <GenericInput {...couponCode} onChange={onChangeHandler} />
        <GenericInput {...couponPercent} onChange={onChangeHandler} />
        <GenericInput {...couponDueDate} onChange={onChangeHandler} />
      </div>
    </div>
  );
};
