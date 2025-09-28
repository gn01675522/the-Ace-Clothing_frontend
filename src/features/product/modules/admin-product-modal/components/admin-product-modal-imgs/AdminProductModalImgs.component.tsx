import { v4 as uuidv4 } from "uuid";

import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import { NoImageSVGLogo, Button, BUTTON_TYPE_CLASS } from "@/components/index";

import type { FC } from "react";

import "./AdminProductModalImgs.styles.scss";

export const AdminProductModalImgs: FC = () => {
  const {
    formControl: {
      formData: { form },
      onChangeHandler,
      onClickToAddImgs,
      onRemoveInput,
    },
  } = useProductManagementContext();

  return (
    <>
      <Button type="button" onClick={onClickToAddImgs}>
        新增
      </Button>
      <div className="admin-product-modal-toggle-list__content">
        {form?.img_urls?.map((url, i) => {
          return (
            <div
              className="admin-product-modal-toggle-list__content-item"
              key={url.id}
            >
              {form?.img_urls?.[i] ? (
                <img
                  src={url.url}
                  alt={`圖片：${form.name}，第${
                    i + 1
                  }張；無法顯示，請輸入正確連結`}
                  className="admin-product-modal-toggle-list__content-item-img"
                />
              ) : (
                <NoImageSVGLogo className="admin-product-modal-toggle-list__content-item-alt" />
              )}
              <label
                className="admin-product-modal-toggle-list__content-item-label"
                htmlFor={`images${i}`}
              >
                圖片 - {i + 1}
                <Button
                  type="button"
                  buttonType={BUTTON_TYPE_CLASS.rectBlackSm}
                  onClick={() => onRemoveInput(url.id)}
                >
                  刪除
                </Button>
              </label>

              <input
                type="text"
                name="img_urls"
                id={`images${i}`}
                placeholder="請輸入圖片連結"
                className="admin-product-modal-toggle-list__content-item-input"
                onChange={(e) => onChangeHandler(e, i)}
                value={url.url || ""}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
