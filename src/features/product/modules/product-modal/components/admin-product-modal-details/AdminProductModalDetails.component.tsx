import { useAdminProductsContext } from "../../../../hooks/admin-products.hooks";

import { NoImageSVGLogo } from "../../../../../../components/index";

import { formContent } from "../../formContent.data";

import type {
  AdminProduct,
  AdminProductForCreate,
} from "../../../../DTOs/adminProduct.types";

import type { FC, KeyboardEvent } from "react";

export const AdminProductModalDetails: FC = () => {
  const {
    formControl: { formData, onChangeHandler },
  } = useAdminProductsContext();

  //* 避免 user 新增到小數點
  const onPreventDotEntry = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ".") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="product-modal__body-check">
        <label className="w-100 form-check-label" htmlFor="is_enabled">
          是否啟用
        </label>
        <input
          type="checkbox"
          id="is_enabled"
          name="is_enabled"
          placeholder="請輸入產品說明內容"
          className="form-check-input"
          onChange={onChangeHandler}
          checked={!!formData?.is_enabled}
        />
      </div>
      <div className="product-modal__body-upper">
        <div className="product-modal__body-upper-left">
          {formData?.imageUrl ? (
            <img
              src={formData?.imageUrl}
              alt={`主圖片：${formData?.title}；無法顯示，請輸入正確連結`}
              className="product-modal__body-upper-left-img"
            />
          ) : (
            <NoImageSVGLogo className="product-modal__body-upper-left-alt" />
          )}
          <label
            className="product-modal__body-upper-left-label"
            htmlFor="image"
          >
            主要圖片
          </label>
          <input
            type="text"
            name="imageUrl"
            id="image"
            placeholder="請輸入圖片連結"
            className="product-modal__body-upper-left-input"
            onChange={onChangeHandler}
            value={formData?.imageUrl || ""}
          />
        </div>

        <div className="product-modal__body-upper-right">
          {formContent.input.map((content) => {
            return (
              <div
                className="product-modal__body-upper-right-group"
                key={content.id}
              >
                <label
                  className="product-modal__body-upper-right-group-label"
                  htmlFor="title"
                >
                  {content.title}
                </label>
                <input
                  type={content.type}
                  id={content.id}
                  name={content.id}
                  step={content.type === "number" ? 1 : "any"}
                  placeholder={content.placeholder}
                  className="product-modal__body-upper-right-group-input"
                  onChange={onChangeHandler}
                  onKeyDown={
                    content.type === "number" ? onPreventDotEntry : undefined
                  }
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
      </div>
    </>
  );
};
