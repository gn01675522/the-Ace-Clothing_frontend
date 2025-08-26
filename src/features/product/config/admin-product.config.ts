import { GENERIC_INPUT_TYPES } from "../../../components/index";

import { AdminProductForCreate } from "../DTOs/adminProduct.types";

export const adminProductFormDetailsConfig = (
  formData: AdminProductForCreate
) => ({
  productIsEnabled: {
    id: "is_enabled",
    name: "is_enabled",
    title: "是否啟用",
    value: formData?.is_enabled,
  },
  productMainImgUrl: {
    id: "image",
    name: "imageUrl",
    title: "品名",
    value: formData?.imageUrl,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入圖片連結",
  },
  productTitle: {
    id: "title",
    name: "title",
    title: "品名",
    value: formData?.title,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入標題",
  },
  productCategory: {
    id: "category",
    name: "category",
    title: "分類",
    value: formData?.category,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入分類",
  },
  productUnit: {
    id: "unit",
    name: "unit",
    title: "單位",
    value: formData?.unit,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入單位",
  },
  productOriginPrice: {
    id: "origin_price",
    name: "origin_price",
    title: "原價(台幣/元)",
    value: formData?.origin_price,
    type: GENERIC_INPUT_TYPES.number,
    placeholder: "請輸入原價",
  },
  productPrice: {
    id: "price",
    name: "price",
    title: "售價(台幣/元)",
    value: formData?.price,
    type: GENERIC_INPUT_TYPES.number,
    placeholder: "請輸入售價",
  },
});

export const adminProductFormDescriptionConfig = (
  formData: AdminProductForCreate
) => ({
  description: {
    id: "description",
    name: "description",
    title: "產品描述",
    type: GENERIC_INPUT_TYPES.text,
    value: formData?.description,
    placeholder: "請輸入產品描述",
  },
  content: {
    id: "content",
    name: "content",
    title: "說明內容",
    type: GENERIC_INPUT_TYPES.text,
    value: formData?.content,
    placeholder: "請輸入產品說明內容",
  },
});
