import { useAdminOrderContext } from "../../hooks/admin-order.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components";

import type { FC } from "react";

import "./AdminOrderModalFooter.styles.scss";

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
    <div className="admin-order-modal-footer">
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
