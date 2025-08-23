import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";

import type { FC } from "react";

export const AdminOrderModalFooter: FC = () => {
  const {
    modalControl: { switchAdminOrderModalOpen },
    formControl: { submitForm },
  } = useAdminOrderContext();

  const onSubmitHandler = () => {
    submitForm();
    switchAdminOrderModalOpen();
  };

  return (
    <div className="order-modal__footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={switchAdminOrderModalOpen}
      >
        關閉
      </Button>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={onSubmitHandler}
      >
        儲存
      </Button>
    </div>
  );
};
