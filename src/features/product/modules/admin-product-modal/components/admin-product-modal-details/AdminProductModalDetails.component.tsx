import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import {
  NoImageSVGLogo,
  GenericInput,
  GenericSelect,
  GenericTextarea,
  Button,
  BUTTON_TYPE_CLASS,
} from "@/components/index";

import {
  adminProductFormDetailsConfig,
  adminProductFormDescriptionConfig,
} from "../../config/admin-product-modal.config";

import type { FC } from "react";

import "./AdminProductModalDetails.styles.scss";

export const AdminProductModalDetails: FC = () => {
  const {
    formControl: {
      formData: { form },
      onChangeHandler,
      onClickToAddFeature,
      onClickToRemoveFeature,
    },
    stateFetch: { categories, genders },
  } = useProductManagementContext();

  const { productMainImgUrl, productGender, productTitle, productCategory } =
    adminProductFormDetailsConfig({
      formData: form,
      options: { categories, genders },
    });

  const { description } = adminProductFormDescriptionConfig(form);

  return (
    <>
      <div className="admin-product-modal-details">
        <div className="admin-product-modal-details__wrapper">
          <GenericInput {...productTitle} onChange={onChangeHandler} />
          <GenericTextarea {...description} onChange={onChangeHandler} />
          <div className="admin-product-modal-details__select">
            <GenericSelect {...productGender} onChange={onChangeHandler} />
            <GenericSelect {...productCategory} onChange={onChangeHandler} />
          </div>
          <Button
            buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
            onClick={onClickToAddFeature}
          >
            新增特性
          </Button>
          {form.features.map((feature, i) => (
            <div
              key={feature.id}
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <GenericInput
                value={feature.feature}
                name="features"
                onChange={(e) => onChangeHandler(e, i)}
              />
              <Button
                onClick={() => onClickToRemoveFeature(feature.id)}
                style={{ width: "50px" }}
              >
                刪除
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
