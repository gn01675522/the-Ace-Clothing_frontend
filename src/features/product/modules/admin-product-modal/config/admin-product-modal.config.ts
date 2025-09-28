import { GENERIC_INPUT_TYPES } from "../../../../../components/index";

import type { AdminProductForCreate } from "../../../types/admin-product.types";

type PropsType = {
  formData: AdminProductForCreate;
  options: {
    categories: { id: string; name: string }[];
    genders: { id: string; name: string }[];
  };
};

export const adminProductFormDetailsConfig = ({
  formData,
  options,
}: PropsType) => ({
  productMainImgUrl: {
    id: "image",
    name: "img_urls",
    title: "主要圖片",
    value: formData?.img_urls?.[0],
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入圖片連結",
  },
  productTitle: {
    id: "name",
    name: "name",
    title: "品名",
    value: formData?.name,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入標題",
  },
  productGender: {
    id: "gender",
    name: "gender",
    title: "適用性別",
    options: options.genders,
    value: formData?.gender,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入性別",
  },
  productCategory: {
    id: "category",
    name: "category",
    title: "分類",
    options: options.categories,
    value: formData?.category,
    type: GENERIC_INPUT_TYPES.text,
    placeholder: "請輸入分類",
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
});

export const defaultProdcutFormStructure: AdminProductForCreate = {
  name: "",
  gender: "",
  category: "",
  features: [],
  description: "",
  img_urls: [],
};
