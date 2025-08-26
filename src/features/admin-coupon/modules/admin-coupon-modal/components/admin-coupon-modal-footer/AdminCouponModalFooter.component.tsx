import { useAdminCouponContext } from "../../../../hooks/admin-coupon.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminCouponModalFooter.styles.scss";

export const AdminCouponModalFooter: FC = () => {
  const {
    formControl: { submitForm, isSaveToSave },
    closeModalAndClearForm,
  } = useAdminCouponContext();

  const onCloseHandler = () => {
    closeModalAndClearForm();
  };

  const onSubmitHandler = () => {
    submitForm();
    onCloseHandler();
  };

  return (
    <div className="admin-coupon-modal-footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onCloseHandler}
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
