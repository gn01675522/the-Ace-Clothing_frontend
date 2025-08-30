import { useState } from "react";

import { useProductManagementContext } from "../../hooks/admin-product-modal.hooks";

import {
  NoImageSVGLogo,
  Button,
  BUTTON_TYPE_CLASS,
} from "../../../../../../components/index";

import type { FC } from "react";

import "./AdminProductModalToggleList.styles.scss";

export const AdminProductModalToggleList: FC = () => {
  const {
    formControl: { formData, setFormData, onChangeHandler },
  } = useProductManagementContext();

  const [isToggleOpen, setIsToggleOpen] = useState(false);

  //* 增加新增 imagesUrl 的 input
  const onAddInput = () => {
    setFormData({
      ...formData,
      imagesUrl: [...formData.imagesUrl, ""],
    });
    if (isToggleOpen === false) setIsToggleOpen(true);
  };

  //* 刪除 imagesUrl
  const onRemoveInput = (i: number) => {
    const filterImages = formData.imagesUrl.filter((_, index) => index !== i);
    setFormData({ ...formData, imagesUrl: [...filterImages] });
  };

  const onOpenToggle = () => setIsToggleOpen(!isToggleOpen);

  return (
    <>
      <input
        id="trigger-check"
        type="checkbox"
        className="admin-product-modal-toggle-list__trigger"
        checked={isToggleOpen}
        onChange={onOpenToggle}
      />
      <label
        className="admin-product-modal-toggle-list__toggle"
        htmlFor="trigger-check"
      >
        <div className="admin-product-modal-toggle-list__triangle" />
        <h6 className="admin-product-modal-toggle-list__title">開啟圖片列表</h6>
      </label>
      <div className="admin-product-modal-toggle-list__content">
        {formData?.imagesUrl.map((url, i) => {
          return (
            <div
              className="admin-product-modal-toggle-list__content-item"
              key={i}
            >
              {formData?.imagesUrl[i] ? (
                <img
                  src={url}
                  alt={`圖片：${formData.title}，第${
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
                  onClick={() => onRemoveInput(i)}
                >
                  刪除
                </Button>
              </label>

              <input
                type="text"
                name={`imagesUrl${i}`}
                id={`images${i}`}
                placeholder="請輸入圖片連結"
                className="admin-product-modal-toggle-list__content-item-input"
                onChange={(e) => onChangeHandler(e, i)}
                value={url || ""}
              />
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcBlackLg}
        onClick={onAddInput}
      >
        新增
      </Button>
    </>
  );
};
