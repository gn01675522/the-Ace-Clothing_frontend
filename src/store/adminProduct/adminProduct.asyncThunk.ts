import { createAppAsyncThunk } from "../redux-utils";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import type { AxiosResponse } from "axios";
import type { AxiosRejectTypes } from "../redux-utils";
import type { AdminProduct, AdminProductForCreate } from "./adminProduct.types";

//********** Helper **********
const cleanedDataHelper = (formData: AdminProduct | AdminProductForCreate) => {
  const cleanImagesArray = formData.imagesUrl.filter((url) => url !== "");
  const cleanedData = { ...formData, imagesUrl: cleanImagesArray };
  return cleanedData;
};
//********** Helper **********

//* 取得 product data
export const fetchAdminProductAsync = createAppAsyncThunk<
  { products: AdminProduct[] },
  void
>("adminProduct/fetchAdminProduct", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
    );

    return { products: res.data.products };
  } catch (e) {
    const error = e as AxiosRejectTypes;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});

//* 刪除 products data
export const deleteAdminProductAsync = createAppAsyncThunk<void, string>(
  "adminProduct/deleteAdminProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminProductAsync());
    } catch (e) {
      const error = e as AxiosRejectTypes;

      if (!error.response) {
        throw e;
      }

      dispatch(setHandleMessage({ type: "error", res: error }));

      return rejectWithValue(error);
    }
  }
);

//* 更新 products data
export const updateAdminProductAsync = createAppAsyncThunk<void, AdminProduct>(
  "adminProduct/updateAdminProduct",
  async (formData, { dispatch, rejectWithValue }) => {
    const newFormData = cleanedDataHelper(formData);
    try {
      const res = (await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${formData.id}`,
        { data: newFormData }
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminProductAsync());
    } catch (e) {
      const error = e as AxiosRejectTypes;

      if (!error.response) {
        throw e;
      }

      dispatch(setHandleMessage({ type: "error", res: error }));

      return rejectWithValue(error);
    }
  }
);

//* 新增 products data
export const createAdminProductAsync = createAppAsyncThunk<
  void,
  AdminProductForCreate
>(
  "adminProduct/createAdminProduct",
  async (data, { dispatch, rejectWithValue }) => {
    const newFormData = cleanedDataHelper(data);
    try {
      const res = (await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`,
        { data: newFormData }
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminProductAsync());
    } catch (e) {
      const error = e as AxiosRejectTypes;

      if (!error.response) {
        throw e;
      }

      dispatch(setHandleMessage({ type: "error", res: error }));

      return rejectWithValue(error);
    }
  }
);
