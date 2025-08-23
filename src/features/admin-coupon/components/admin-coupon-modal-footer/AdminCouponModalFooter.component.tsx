import { useAdminCouponContext } from "../../hooks/admin-coupon.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import type { FC } from "react";

export const AdminCouponModalFooter: FC = () => {
  const {
    modalControl: { switchModalOpen },
    formControl: { submitForm, isSaveToSave },
  } = useAdminCouponContext();

  const onSubmitHandler = () => {
    submitForm();
    switchModalOpen();
  };

  return (
    <div className="coupon-modal__footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={switchModalOpen}
      >
        關閉
      </Button>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onSubmitHandler}
        disabled={!isSaveToSave}
      >
        儲存
      </Button>
    </div>
  );
};
