import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import { FORM_OPERATION_OPTIONS } from "../../../../../../shared/types";

import type { FC } from "react";

import "./AdminProductModalHeader.styles.scss";

export const AdminProductModalHeader: FC = () => {
  const {
    formControl: {
      type,
      formData: { form },
    },
    onCloseHandler,
  } = useProductManagementContext();

  const titleByType =
    type === FORM_OPERATION_OPTIONS.create
      ? "建立新商品"
      : `產品名稱：${form.title}`;

  return (
    <div className="admin-product-modal-header">
      <h1 className="admin-product-modal-header__title">{titleByType}</h1>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
        aria-label="Close"
        onClick={onCloseHandler}
      >
        ｘ
      </Button>
    </div>
  );
};
