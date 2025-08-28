import { useCouponManagementContext } from "../../hooks/admin-coupon-modal.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminCouponModalFooter.styles.scss";

export const AdminCouponModalFooter: FC = () => {
  const {
    formControl: { submitForm, isSaveToSave },
    closeModalAndClearForm,
  } = useCouponManagementContext();

  const onSubmitHandler = () => {
    submitForm();
    closeModalAndClearForm();
  };

  return (
    <div className="admin-coupon-modal-footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={closeModalAndClearForm}
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
