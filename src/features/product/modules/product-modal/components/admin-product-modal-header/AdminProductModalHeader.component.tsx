import { useAdminProductsContext } from "../../../../hooks/admin-products.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import { FORM_OPERATION_OPTIONS } from "../../../../../../shared/types";

import type { FC } from "react";

export const AdminProductModalHeader: FC = () => {
  const {
    formControl: { createOrEdit, formData },
    modalControl: { switchAdminProductModalOpen },
  } = useAdminProductsContext();

  return (
    <div className="product-modal__header">
      <h1 className="product-modal__header-title">
        {createOrEdit === FORM_OPERATION_OPTIONS.create
          ? "建立新商品"
          : `產品名稱：${formData.title}`}
      </h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={switchAdminProductModalOpen}
      >
        ｘ
      </Button>
    </div>
  );
};
