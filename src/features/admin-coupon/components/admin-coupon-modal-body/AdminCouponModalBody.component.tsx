import { formatTimestampInMilliSeconds } from "../../../../utils/common.utils";

import { adminCouponFormConfig } from "../../config/admin-coupon.config";

import type { FC, ChangeEvent } from "react";
import type { AdminCouponWithId } from "../../DTOs/adminCoupon.dtos";
import type { AdminCouponFormType } from "../../types/admin-coupon.types";

type PropsType = {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: AdminCouponFormType | AdminCouponWithId;
};

export const AdminCouponModalBody: FC<PropsType> = ({
  onChangeHandler,
  formData,
}) => {
  return (
    <div className="coupon-modal__body">
      <div className="coupon-modal__body-check">
        <label className="coupon-modal__body-check-label" htmlFor="is_enabled">
          是否啟用
        </label>
        <input
          className="coupon-modal__body-check-input"
          type="checkbox"
          id="is_enabled"
          name="is_enabled"
          checked={!!formData.is_enabled}
          onChange={onChangeHandler}
        />
      </div>
      <div className="coupon-modal__body-content">
        {adminCouponFormConfig.map((content) => {
          return (
            <div className="coupon-modal__body-content-group" key={content.id}>
              <label
                className="coupon-modal__body-content-group-label"
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
                className="coupon-modal__body-content-group-input"
                value={
                  content.id === "due_date"
                    ? formatTimestampInMilliSeconds(formData[content.id])
                    : formData[
                        content.id as keyof (
                          | AdminCouponWithId
                          | AdminCouponFormType
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
