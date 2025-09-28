import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { v4 as uuidv4 } from "uuid";

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
import {
  fetchOptionProductCategoriesAsync,
  fetchOptionGendersAsync,
} from "@/store/option/option.asyncThunk";
import { setClearOptionState } from "@/store/option/option.slice";
import {
  selectOptionProductCategories,
  selectOptionGenders,
} from "@/store/option/option.selector";

import { FORM_OPERATION_OPTIONS } from "@/shared/types";

import { defaultProdcutFormStructure } from "../config/admin-product-modal.config";
import {
  mapToProductForm,
  mapToEditProductDTO,
  mapToCreateProductDTO,
} from "../utils/admin-product-modal.utils";

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

export const useAdminProductModalFormControl = () => {
  const [formData, setFormData] = useState<{
    id: string | null;
    form: AdminProductForCreate;
  }>({ id: null, form: defaultProdcutFormStructure });

  const targetData = useAppSelector(selectAdminProductEditModalTargetData);
  const type = useAppSelector(selectAdminProductEditModalType);

  const dispatch = useAppDispatch();

  const isSaveToSave =
    formData.form.name.length > 0 || formData.form.description.length > 0;

  //* 針對每個 input 在新增內容時放入 formData
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    i?: number
  ) => {
    const { value, name } = e.target;

    if (name === "img_urls") {
      setFormData((prev) => ({
        ...prev,
        form: {
          ...prev.form,
          img_urls: prev.form.img_urls.map((url, index) =>
            index === i ? { id: url.id, url: value } : url
          ),
        },
      }));
    } else if (name === "features") {
      setFormData((prev) => ({
        ...prev,
        form: {
          ...prev.form,
          features: prev.form.features.map((feature, index) =>
            index === i ? { id: feature.id, feature: value } : feature
          ),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        form: { ...prev.form, [name]: value },
      }));
    }
  };

  //* 增加新增 imagesUrl 的 input
  const onClickToAddImgs = () => {
    const newForm = {
      ...formData.form,
      img_urls: [...formData.form.img_urls, { id: uuidv4(), url: "" }],
    };
    setFormData((prev) => ({
      ...prev,
      form: newForm,
    }));
  };

  //* 刪除 imagesUrl
  const onRemoveInput = (id: string) => {
    const newForm = {
      ...formData.form,
      img_urls: formData.form.img_urls.filter((url) => url.id !== id),
    };

    setFormData((prev) => ({
      ...prev,
      form: newForm,
    }));
  };

  const onClickToAddFeature = () => {
    const newForm = {
      ...formData.form,
      features: [...formData.form.features, { id: uuidv4(), feature: "" }],
    };
    setFormData((prev) => ({ ...prev, form: newForm }));
  };

  const onClickToRemoveFeature = (id: string) => {
    const newForm = {
      ...formData.form,
      features: formData.form.features.filter((feature) => feature.id !== id),
    };
    setFormData((prev) => ({ ...prev, form: newForm }));
  };

  const submitForm = () => {
    if (type === FORM_OPERATION_OPTIONS.create) {
      const newData = mapToCreateProductDTO(formData.form);

      dispatch(createAdminProductAsync(newData));
    } else if (type === FORM_OPERATION_OPTIONS.edit && formData.id) {
      const newData = mapToEditProductDTO(formData.id, formData.form);

      dispatch(updateAdminProductAsync(newData));
    }
  };

  //* 根據 type 開啟相對應 modal，並放入相對應資料
  useEffect(() => {
    if (type === FORM_OPERATION_OPTIONS.create) {
      setFormData({
        id: null,
        form: defaultProdcutFormStructure,
      });
    } else if (type === FORM_OPERATION_OPTIONS.edit && targetData) {
      const newData = mapToProductForm(targetData);

      setFormData({ id: newData._id, form: newData });
    }
  }, [type, targetData]);

  return {
    formData,
    type,
    isSaveToSave,
    setFormData,
    submitForm,
    onChangeHandler,
    onClickToAddImgs,
    onRemoveInput,
    onClickToAddFeature,
    onClickToRemoveFeature,
  };
};

export const useAdminProductEditModalControl = () => {
  const isOpen = useAppSelector(selectAdminProductEditModalIsOpen);

  const dispatch = useAppDispatch();

  const switchModalOpen = () => dispatch(setProductEditModalIsOpen(!isOpen));

  return { isOpen, switchModalOpen };
};

export const useAdminProductEditModalStateFetch = () => {
  const categories = useAppSelector(selectOptionProductCategories);
  const genders = useAppSelector(selectOptionGenders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOptionProductCategoriesAsync());
    dispatch(fetchOptionGendersAsync());

    return () => {
      dispatch(setClearOptionState());
    };
  }, []);

  return { categories, genders };
};
