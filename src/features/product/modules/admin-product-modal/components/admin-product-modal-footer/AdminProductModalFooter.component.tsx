import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminProductModalFooter.styles.scss";

export const AdminProductModalFooter: FC = () => {
  const {
    formControl: { isSaveToSave, submitForm },
    modalControl: { switchModalOpen },
  } = useProductManagementContext();

  //* 按下儲存鍵後提交資料
  const onSubmitHandler = () => {
    submitForm();
    switchModalOpen();
  };

  return (
    <div className="admin-product-modal-footer">
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
