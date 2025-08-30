import { useState, useEffect, useContext } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/redux-hooks";

import { ProductManagementContext } from "../contexts/admin-product-modal.contexts";

import { setProductEditModalIsOpen } from "../../../store/admin/adminProduct.slice";
import {
  createAdminProductAsync,
  updateAdminProductAsync,
} from "../../../store/admin/adminProduct.asyncThunk";
import {
  selectAdminProductEditModalIsOpen,
  selectAdminProductEditModalType,
  selectAdminProductEditModalTargetData,
} from "../../../store/admin/adminProduct.selector";

import { FORM_OPERATION_OPTIONS } from "../../../../../shared/types";

import type { ChangeEvent } from "react";
import type { IGetAdminProduct } from "../../../DTOs/adminProduct.types";
import type { Product } from "../../../DTOs/userProduct.types";
import type { AdminProductForCreate } from "../../../types/admin-product.types";

export const useProductManagementContext = () => {
  const context = useContext(ProductManagementContext);

  if (!context)
    throw new Error(
      "useProductManagementContext must be used within ProductManagementContextProvider"
    );

  return context;
};

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

export const useAdminProductModalFormControl = (
  category: string | undefined
) => {
  const [formData, setFormData] =
    useState<AdminProductForCreate>(defaultFormData);

  const targetData = useAppSelector(selectAdminProductEditModalTargetData);
  const type = useAppSelector(selectAdminProductEditModalType);

  const dispatch = useAppDispatch();

  const isSaveToSave =
    formData?.title?.length > 0 || formData?.unit?.length > 0;

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

  const submitForm = () => {
    if (type === FORM_OPERATION_OPTIONS.create) {
      dispatch(createAdminProductAsync(formData));
    } else {
      dispatch(updateAdminProductAsync(formData as IGetAdminProduct));
    }
  };

  //* 根據 type 開啟相對應 modal，並放入相對應資料
  useEffect(() => {
    if (type === FORM_OPERATION_OPTIONS.create) {
      setFormData({ ...defaultFormData, category: `${category}-` });
    } else if (type === FORM_OPERATION_OPTIONS.edit && targetData) {
      setFormData(targetData);
    }
  }, [type, targetData, category]);

  return {
    formData,
    type,
    isSaveToSave,
    setFormData,
    submitForm,
    onChangeHandler,
  };
};

export const useAdminProductEditModalControl = () => {
  const isOpen = useAppSelector(selectAdminProductEditModalIsOpen);

  const dispatch = useAppDispatch();

  const switchModalOpen = () => dispatch(setProductEditModalIsOpen(!isOpen));

  return { isOpen, switchModalOpen };
};
