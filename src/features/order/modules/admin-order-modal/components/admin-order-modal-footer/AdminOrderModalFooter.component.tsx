import { useOrderManagementContext } from "../../hooks/admin-order-modal.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components";

import type { FC } from "react";

import "./AdminOrderModalFooter.styles.scss";

export const AdminOrderModalFooter: FC = () => {
  const {
    modalControl: { switchModalOpen },
    formControl: { submitForm },
  } = useOrderManagementContext();

  const onSubmitHandler = () => {
    submitForm();
    switchModalOpen();
  };

  return (
    <div className="admin-order-modal-footer">
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
      >
        儲存
      </Button>
    </div>
  );
};
