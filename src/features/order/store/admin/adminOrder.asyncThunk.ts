import { createAppAsyncThunk } from "../../../../store/redux-utils";
import axios, { type AxiosResponse } from "axios";

import { setHandleMessage } from "../../../../store/message/message.slice";

import type { AxiosRejectTypes } from "../../../../store/redux-utils";
import type { PaginationType } from "../../../../shared/types/types";
import type { Order } from "../../DTOs/adminOrders.dtos";

//* 擷取 admin orders api 中的資料
export const fetchAdminOrdersAsync = createAppAsyncThunk<
  { orders: Order[]; pagination: PaginationType },
  number | undefined
>("adminOrders/fetchAdminOrders", async (page = 1, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.APP_API_PATH}/admin/orders?page=${page}`
    );

    return {
      orders: res.data.orders,
      pagination: res.data.pagination,
    };
  } catch (e) {
    const error = e as AxiosRejectTypes;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});

//* 更新 admin orders api 中的資料
export const updateAdminOrdersAsync = createAppAsyncThunk<void, Order>(
  "adminOrders/updateAdminOrders",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/admin/order/${data.id}`,
        { data }
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminOrdersAsync());
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

//* 刪除 admin orders api 中的資料
export const deleteAdminOrdersAsync = createAppAsyncThunk<void, string>(
  "adminOrders/deleteAdminOrders",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.delete(
        `/v2/api/${process.env.APP_API_PATH}/admin/order/${id}`
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminOrdersAsync());
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
