import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import { NoImageSVGLogo } from "../../../../../../components/index";
import { GenericInput, ToggleSwitch } from "../../../../../../components/index";

import { adminProductFormDetailsConfig } from "../../config/admin-product-modal.config";

import type { FC, KeyboardEvent } from "react";

import "./AdminProductModalDetails.styles.scss";

export const AdminProductModalDetails: FC = () => {
  const {
    formControl: {
      formData: { form },
      onChangeHandler,
    },
  } = useProductManagementContext();

  //* 避免 user 新增到小數點
  const onPreventDotEntry = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ".") {
      e.preventDefault();
    }
  };

  const {
    productIsEnabled,
    productMainImgUrl,
    productTitle,
    productCategory,
    productUnit,
    productOriginPrice,
    productPrice,
  } = adminProductFormDetailsConfig(form);

  return (
    <>
      <ToggleSwitch {...productIsEnabled} onChange={onChangeHandler} />
      <div className="admin-product-modal-details__content">
        <div className="admin-product-modal-details__content-left">
          {form.imageUrl ? (
            <img
              src={form.imageUrl}
              alt={`主圖片：${form.title}；無法顯示，請輸入正確連結`}
              className="admin-product-modal-details__content-left-img"
            />
          ) : (
            <NoImageSVGLogo className="admin-product-modal-details__content-left-alt" />
          )}
          <GenericInput {...productMainImgUrl} onChange={onChangeHandler} />
        </div>

        <div className="admin-product-modal-details__content-right">
          <GenericInput {...productTitle} onChange={onChangeHandler} />
          <GenericInput {...productCategory} onChange={onChangeHandler} />
          <GenericInput {...productUnit} onChange={onChangeHandler} />
          <GenericInput
            {...productOriginPrice}
            onChange={onChangeHandler}
            onKeyDown={onPreventDotEntry}
          />
          <GenericInput
            {...productPrice}
            onChange={onChangeHandler}
            onKeyDown={onPreventDotEntry}
          />
        </div>
      </div>
    </>
  );
};
