import { createAppAsyncThunk } from "../redux-utils";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import type { Product, ProductById } from "./userProduct.types";
import type { AxiosError } from "axios";

//* 取得 api 裡面全部的產品資訊
export const fetchUserProductAsync = createAppAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("userProduct/fetchUserProduct", async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.APP_API_PATH}/products/all`
    );

    return res.data.products;
  } catch (e) {
    const error = e as AxiosError<string>;
    if (!error.response) {
      throw e;
    }
    dispatch(setHandleMessage({ type: "error", res: error }));
    return rejectWithValue(error.response.data);
  }
});

//* 讓 api 根據我們傳入的 id 來找到我們要的產品
export const fetchUserSingleProductAsync = createAppAsyncThunk<
  ProductById,
  string,
  { rejectValue: string }
>(
  "userProduct/fetchUserSingleProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.APP_API_PATH}/product/${id}`
      );
      return productRes.data.product;
    } catch (e) {
      const error = e as AxiosError<string>;
      if (!error.response) {
        throw e;
      }
      dispatch(setHandleMessage({ type: "error", res: error }));
      return rejectWithValue(error.response.data);
    }
  }
);
