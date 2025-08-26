import { useAdminProductsContext } from "../../../../hooks/admin-products.hooks";

import { GenericTextarea } from "../../../../../../components/index";

import { adminProductFormDescriptionConfig } from "../../../../config/admin-product.config";

import type { FC } from "react";

import "./AdminProductModalDescription.styles.scss";

export const AdminProductModalDescription: FC = () => {
  const {
    formControl: { formData, onChangeHandler },
  } = useAdminProductsContext();

  const { description, content } = adminProductFormDescriptionConfig(formData);

  return (
    <div className="product-modal__body-middle">
      <GenericTextarea {...description} onChange={onChangeHandler} />
      <GenericTextarea {...content} onChange={onChangeHandler} />
    </div>
  );
};
