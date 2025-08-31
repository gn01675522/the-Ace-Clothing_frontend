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

import { defaultProdcutFormStructure } from "../config/admin-product-modal.config";

import type { ChangeEvent } from "react";
import type { AdminProductForCreate } from "../../../types/admin-product.types";

export const useProductManagementContext = () => {
  const context = useContext(ProductManagementContext);

  if (!context)
    throw new Error(
      "useProductManagementContext must be used within ProductManagementContextProvider"
    );

  return context;
};

export const useAdminProductModalFormControl = (
  category: string | undefined
) => {
  const [formData, setFormData] = useState<{
    id: string | null;
    form: AdminProductForCreate;
  }>({ id: null, form: defaultProdcutFormStructure });

  const targetData = useAppSelector(selectAdminProductEditModalTargetData);
  const type = useAppSelector(selectAdminProductEditModalType);

  const dispatch = useAppDispatch();

  const isSaveToSave =
    formData.form.title.length > 0 || formData.form.unit.length > 0;

  //* 針對每個 input 在新增內容時放入 formData
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i?: number
  ) => {
    const { value, name } = e.target;

    if (["price", "origin_price"].includes(name)) {
      const newForm = { ...formData.form, [name]: Number(value) };
      setFormData((prev) => ({ ...prev, form: newForm }));
    } else if (
      name === "is_enabled" &&
      e.target instanceof HTMLInputElement &&
      e.target.type === "checkbox"
    ) {
      const newForm = { ...formData.form, [name]: +e.target.checked };
      setFormData((prev) => ({ ...prev, form: newForm }));
    } else if (name.startsWith("imagesUrl")) {
      const newImages = [...formData.form.imagesUrl];
      newImages[i!] = value;
      const newForm = { ...formData.form, imagesUrl: newImages };
      setFormData((prev) => ({ ...prev, form: newForm }));
    } else {
      setFormData((prev) => ({
        ...prev,
        form: { ...prev.form, [name]: value },
      }));
    }
  };

  const submitForm = () => {
    if (type === FORM_OPERATION_OPTIONS.create) {
      dispatch(createAdminProductAsync(formData));
    } else {
      const newData = { id: formData.id, ...formData.form };

      dispatch(updateAdminProductAsync(newData));
    }
  };

  //* 根據 type 開啟相對應 modal，並放入相對應資料
  useEffect(() => {
    if (type === FORM_OPERATION_OPTIONS.create) {
      setFormData({
        id: null,
        form: { ...defaultProdcutFormStructure, category: `${category}-` },
      });
    } else if (type === FORM_OPERATION_OPTIONS.edit && targetData) {
      const { id, ...rest } = targetData;
      setFormData({ id, form: rest });
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
