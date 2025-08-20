import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import type { FC, MouseEvent } from "react";
import type { AdminCouponWithId } from "../../DTOs/adminCoupon.dtos";
import type { AdminCouponFormType } from "../../types/admin-coupon.types";

type PropsType = {
  onClickToClose: (e: MouseEvent<HTMLButtonElement>) => void;
  onSubmitHandler: () => void;
  formData: AdminCouponFormType | AdminCouponWithId;
};

export const AdminCouponModalFooter: FC<PropsType> = ({
  onClickToClose,
  onSubmitHandler,
  formData,
}) => {
  return (
    <div className="coupon-modal__footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onClickToClose}
      >
        關閉
      </Button>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onSubmitHandler}
        disabled={formData.title.length === 0}
      >
        儲存
      </Button>
    </div>
  );
};
