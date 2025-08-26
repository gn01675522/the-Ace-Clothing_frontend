import { useAdminProductsContext } from "../../../../hooks/admin-products.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminProductModalFooter.styles.scss";

export const AdminProductModalFooter: FC = () => {
  const {
    formControl: { isSaveToSave, submitForm },
    modalControl: { switchAdminProductModalOpen },
  } = useAdminProductsContext();

  //* 按下儲存鍵後提交資料
  const onSubmitHandler = () => {
    submitForm();
    switchAdminProductModalOpen();
  };

  return (
    <div className="admin-product-modal-footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
        onClick={switchAdminProductModalOpen}
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
