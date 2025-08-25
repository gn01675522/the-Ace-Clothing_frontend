import { useAdminProductsContext } from "../../../../hooks/admin-products.hooks";

import { formContent } from "../../formContent.data";

import type { FC } from "react";

export const AdminProductModalDescription: FC = () => {
  const {
    formControl: { formData, onChangeHandler },
  } = useAdminProductsContext();
  return (
    <div className="product-modal__body-middle">
      {formContent.textarea.map((content) => {
        return (
          <div className="product-modal__body-middle-group" key={content.id}>
            <label
              className="product-modal__body-middle-group-label"
              htmlFor={content.id}
            >
              {content.title}
            </label>
            <textarea
              id={content.id}
              name={content.id}
              placeholder={content.placeholder}
              className="product-modal__body-middle-group-textarea"
              onChange={onChangeHandler}
              value={
                formData?.[
                  content.id as keyof (AdminProduct | AdminProductForCreate)
                ] || ""
              }
            />
          </div>
        );
      })}
    </div>
  );
};
