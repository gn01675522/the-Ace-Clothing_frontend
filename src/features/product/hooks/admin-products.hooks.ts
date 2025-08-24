import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { AdminProductsContext } from "../contexts/adminProducts.context";

import { FORM_OPERATION_OPTIONS } from "../../../shared/types";

import { setClearAdminProductState } from "../store/admin/adminProduct.slice";
import {
  fetchAdminProductAsync,
  createAdminProductAsync,
  updateAdminProductAsync,
} from "../store/admin/adminProduct.asyncThunk";
import {
  selectAdminProductIsLoading,
  classifyAdminProducts,
} from "../store/admin/adminProduct.selector";

import type { ChangeEvent } from "react";
import type { Product } from "../DTOs/userProduct.types";
import type {
  AdminProductForCreate,
  AdminProduct,
} from "../DTOs/adminProduct.types";

export const useAdminProductsContext = () => {
  const context = useContext(AdminProductsContext);

  if (!context)
    throw new Error(
      "useAdminProductsContext must be used within AdminProductsContextProvider"
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
  const [createOrEdit, setCreateOrEdit] = useState(
    FORM_OPERATION_OPTIONS.create
  );
  const [targetData, setTargetData] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<
    AdminProductForCreate | AdminProduct
  >(defaultFormData);

  const dispatch = useAppDispatch();

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
    if (createOrEdit === FORM_OPERATION_OPTIONS.create) {
      dispatch(createAdminProductAsync(formData));
    } else {
      dispatch(updateAdminProductAsync(formData as AdminProduct));
    }
  };

  //* 根據 type 開啟相對應 modal，並放入相對應資料
  useEffect(() => {
    if (createOrEdit === FORM_OPERATION_OPTIONS.create) {
      setFormData({ ...defaultFormData, category: `${category}-` });
    } else if (createOrEdit === FORM_OPERATION_OPTIONS.edit && targetData) {
      setFormData(targetData);
    }
  }, [createOrEdit, targetData, category]);

  return {
    formData,
    createOrEdit,
    setCreateOrEdit,
    submitForm,
    setFormData,
    setTargetData,
    onChangeHandler,
  };
};

export const useAdminProductsModalControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchAdminProductModalOpen = () => setIsModalOpen(!isModalOpen);

  return { isModalOpen, setIsModalOpen, switchAdminProductModalOpen };
};

export const useAdminProductModalStateFetch = (
  category: string | undefined
) => {
  const productCategory = category ? category : "all";

  const products = useAppSelector(classifyAdminProducts(productCategory));
  const isLoading = useAppSelector(selectAdminProductIsLoading);
  const pageCount = Math.ceil(products.length / 10);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
    return () => {
      dispatch(setClearAdminProductState());
    };
  }, []);

  return { products, pageCount, isLoading };
};
