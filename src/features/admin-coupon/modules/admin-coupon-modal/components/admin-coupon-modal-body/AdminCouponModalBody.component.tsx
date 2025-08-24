import { useAdminCouponContext } from "../../../../hooks/admin-coupon.hooks";

import { formatTimestampInMilliSeconds } from "../../../../../../utils/common.utils";

import { adminCouponFormConfig } from "../../../../config/admin-coupon.config";

import type { FC } from "react";
import type {
  IGetAdminCoupon,
  ICreateAdminCoupon,
} from "../../../../DTOs/adminCoupon.dtos";

import "./AdminCouponModalBody.styles.scss";

export const AdminCouponModalBody: FC = () => {
  const {
    formControl: {
      formData: { form },
      onChangeHandler,
    },
  } = useAdminCouponContext();

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
        {adminCouponFormConfig.map((content) => {
          return (
            <div
              className="admin-coupon-modal-body__content-group"
              key={content.id}
            >
              <label
                className="admin-coupon-modal-body__content-group-label"
                htmlFor={content.id}
              >
                {content.title}
              </label>
              <input
                type={content.type}
                id={content.id}
                placeholder={
                  content.id === "percent"
                    ? undefined
                    : `請輸入${content.title}`
                }
                name={content.id}
                className="admin-coupon-modal-body__content-group-input"
                value={
                  content.id === "due_date"
                    ? formatTimestampInMilliSeconds(form[content.id])
                    : form[
                        content.id as keyof (
                          | IGetAdminCoupon
                          | ICreateAdminCoupon
                        )
                      ]
                }
                onChange={onChangeHandler}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
