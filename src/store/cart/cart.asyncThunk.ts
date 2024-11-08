import { createAppAsyncThunk } from "../redux-utils";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import type { AxiosError } from "axios";
import type { Cart, CartItems, CartItemAddToCart } from "./cart.types";

//* fetch 目前的購物車內商品資訊
export const fetchCartItemsAsync = createAppAsyncThunk<
  Cart,
  void,
  { rejectValue: string }
>("cart/fetchCartItems", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/v2/api/${process.env.APP_API_PATH}/cart`);

    return res.data.data;
  } catch (e) {
    const error = e as AxiosError<string>;
    if (!error.response) {
      throw e;
    }
    return rejectWithValue(error.response.data);
  }
});

//* 新增商品至購物車
export const setAddItemToCartAsync = createAppAsyncThunk<
  void,
  CartItemAddToCart,
  { rejectValue: string }
>("cart/setAddItemToCart", async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.post(
      `/v2/api/${process.env.APP_API_PATH}/cart`,
      data
    );
    dispatch(setHandleMessage({ type: "success", res }));
    dispatch(fetchCartItemsAsync());
  } catch (e) {
    const error = e as AxiosError<string>;
    dispatch(setHandleMessage({ type: "error", res: error }));
    if (!error.response) {
      throw e;
    }
    return rejectWithValue(error.response.data);
  }
});

//* 從購物車內移除商品
export const setRemoveItemFromCartAsync = createAppAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("cart/setRemoveItemfromCart", async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.delete(
      `/v2/api/${process.env.APP_API_PATH}/cart/${id}`
    );
    dispatch(setHandleMessage({ type: "success", res }));
    dispatch(fetchCartItemsAsync());
  } catch (e) {
    const error = e as AxiosError<string>;
    dispatch(setHandleMessage({ type: "error", res: error }));
    if (!error.response) {
      throw e;
    }
    return rejectWithValue(error.response.data);
  }
});

//* 修改購物車內商品
export const setUpdateCartItemAsync = createAppAsyncThunk<
  void,
  {
    item: { id: string; loadingItems: []; product_id: string };
    quantity: number;
  },
  { rejectValue: string }
>(
  "cart/setUpdateCartItem",
  async ({ item, quantity }, { dispatch, rejectWithValue }) => {
    const data = {
      data: { product_id: item.product_id, qty: quantity },
    };
    try {
      const res = await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/cart/${item.id}`,
        data
      );
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchCartItemsAsync());
    } catch (e) {
      const error = e as AxiosError<string>;
      dispatch(setHandleMessage({ type: "error", res: error }));
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
