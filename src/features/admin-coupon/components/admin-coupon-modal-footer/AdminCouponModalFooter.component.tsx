import { useAdminCouponContext } from "../../hooks/admin-coupon.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import type { FC } from "react";

export const AdminCouponModalFooter: FC = () => {
  const {
    modalControl: { setIsModalOpen },
    formControl: { submitForm, isSaveToSave },
  } = useAdminCouponContext();

  const onSubmitHandler = () => {
    submitForm();
    setIsModalOpen(false);
  };

  return (
    <div className="coupon-modal__footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={() => setIsModalOpen(false)}
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
