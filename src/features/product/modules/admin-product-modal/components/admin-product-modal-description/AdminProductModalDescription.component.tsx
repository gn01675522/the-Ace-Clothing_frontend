import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import { GenericTextarea } from "../../../../../../components/index";

import { adminProductFormDescriptionConfig } from "../../config/admin-product-modal.config";

import type { FC } from "react";

import "./AdminProductModalDescription.styles.scss";

export const AdminProductModalDescription: FC = () => {
  const {
    formControl: {
      formData: { form },
      onChangeHandler,
    },
  } = useProductManagementContext();

  const { description, content } = adminProductFormDescriptionConfig(form);

  return (
    <div className="admin-product-modal-description">
      <GenericTextarea {...description} onChange={onChangeHandler} />
      <GenericTextarea {...content} onChange={onChangeHandler} />
    </div>
  );
};
