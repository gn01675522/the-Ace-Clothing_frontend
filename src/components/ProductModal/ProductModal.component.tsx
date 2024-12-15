import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/redux-hooks";

import NoImageSVGLogo from "../SVGIcons/NoImageSVGLogo.component";
import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";
import ModalPortal from "../ModalPortal/ModalPortal.component";

import {
  updateAdminProductAsync,
  createAdminProductAsync,
} from "../../store/adminProduct/adminProduct.asyncThunk";

import { formContent } from "./formContent.data";

import type { ChangeEvent, FC, KeyboardEvent } from "react";
import type { Product } from "../../store/userProduct/userProduct.types";
import type {
  AdminProduct,
  AdminProductForCreate,
} from "../../store/adminProduct/adminProduct.types";

import "./ProductModal.styles.scss";

const defaultFormData: AdminProductForCreate = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  num: 0,
  description: "",
  content: "",
  is_enabled: 0,
  imageUrl: "",
  imagesUrl: [],
};

type PropsType = {
  createOrEdit: "create" | "edit";
  targetData: AdminProduct | null;
  onClickToCloseModal: () => void;
};

const ProductModal: FC<PropsType> = ({
  createOrEdit,
  targetData,
  onClickToCloseModal,
}) => {
  const [formData, setFormData] = useState<
    AdminProductForCreate | AdminProduct
  >(defaultFormData);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { category } = useParams();

  //* 增加新增 imagesUrl 的 input
  const onAddInput = () => {
    setFormData({
      ...formData,
      imagesUrl: [...formData.imagesUrl, ""],
    });
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    }
  };

  //* 刪除 imagesUrl
  const onRemoveInput = (i: number) => {
    const filterImages = formData.imagesUrl.filter((_, index) => index !== i);
    setFormData({ ...formData, imagesUrl: [...filterImages] });
  };

  //* 針對每個 input 在新增內容時放入 formData
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i?: number
  ) => {
    const { value, name } = e.target;
    if (["price", "origin_price"].includes(name)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (
      name === "is_enabled" &&
      e.target instanceof HTMLInputElement &&
      e.target.type === "checkbox"
    ) {
      setFormData({ ...formData, [name as keyof Product]: +e.target.checked });
    } else if (name.startsWith("imagesUrl")) {
      const newImages = [...formData.imagesUrl] as string[];
      newImages[i!] = value;
      setFormData({ ...formData, imagesUrl: newImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onOpenToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  //* 按下儲存鍵後提交資料
  const onSubmitHandler = () => {
    if (createOrEdit === "create") {
      dispatch(createAdminProductAsync(formData));
    } else {
      dispatch(updateAdminProductAsync(formData as AdminProduct));
    }
    onClickToCloseModal();
  };

  //* 避免 user 新增到小數點
  const onPreventDotEntry = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ".") {
      e.preventDefault();
    }
  };

  //* 根據 type 開啟相對應 modal，並放入相對應資料
  useEffect(() => {
    if (createOrEdit === "create") {
      setFormData({ ...defaultFormData, category: `${category}-` });
    } else if (createOrEdit === "edit" && targetData) {
      setFormData(targetData);
    }
  }, [createOrEdit, targetData, category]);

  return (
    <ModalPortal backdropClose={onClickToCloseModal}>
      <div className="product-modal">
        <div className="product-modal__header">
          <h1 className="product-modal__header-title">
            {createOrEdit === "create"
              ? "建立新商品"
              : `產品名稱：${formData.title}`}
          </h1>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
            aria-label="Close"
            onClick={onClickToCloseModal}
          >
            ｘ
          </Button>
        </div>

        <div className="product-modal__body">
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
              checked={!!formData.is_enabled}
            />
          </div>
          <div className="product-modal__body-upper">
            <div className="product-modal__body-upper-left">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt={`主圖片：${formData.title}；無法顯示，請輸入正確連結`}
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
                value={formData.imageUrl || ""}
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
                        content.type === "number"
                          ? onPreventDotEntry
                          : undefined
                      }
                      value={
                        formData[
                          content.id as keyof (
                            | AdminProduct
                            | AdminProductForCreate
                          )
                        ] || ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="product-modal__body-middle">
            {formContent.textarea.map((content) => {
              return (
                <div
                  className="product-modal__body-middle-group"
                  key={content.id}
                >
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
                      formData[
                        content.id as keyof (
                          | AdminProduct
                          | AdminProductForCreate
                        )
                      ] || ""
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="product-modal__body-lower">
            <h6 className="product-modal__body-lower-title">
              次要圖片(可多張)
            </h6>
            <input
              id="trigger-check"
              type="checkbox"
              className="product-modal__body-lower-trigger"
              checked={isToggleOpen}
              onChange={onOpenToggle}
            />
            <label
              className="product-modal__body-lower-toggle"
              htmlFor="trigger-check"
            >
              <div className="product-modal__body-lower-triangle" />
              <h6 className="product-modal__body-lower-toggle-title">
                開啟圖片列表
              </h6>
            </label>
            <div className="product-modal__body-lower-content">
              {formData.imagesUrl.map((url, i) => {
                return (
                  <div
                    className="product-modal__body-lower-content-item"
                    key={i}
                  >
                    {formData.imagesUrl[i] ? (
                      <img
                        src={url}
                        alt={`圖片：${formData.title}，第${
                          i + 1
                        }張；無法顯示，請輸入正確連結`}
                        className="product-modal__body-lower-content-item-img"
                      />
                    ) : (
                      <NoImageSVGLogo className="product-modal__body-lower-content-item-alt" />
                    )}
                    <label
                      className="product-modal__body-lower-content-item-label"
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
                      className="product-modal__body-lower-content-item-input"
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
          </div>
        </div>

        <div className="product-modal__footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onClickToCloseModal}
          >
            關閉
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
            onClick={onSubmitHandler}
            disabled={formData.title.length === 0 || formData.unit.length === 0}
          >
            儲存
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ProductModal;
