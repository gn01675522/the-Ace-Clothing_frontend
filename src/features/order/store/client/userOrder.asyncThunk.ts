import { createAppAsyncThunk } from "../../../../store/redux-utils";
import axios from "axios";

import type { AxiosRejectTypes } from "../../../../store/redux-utils";
import type {
  OrderDetail,
  OrderDetailWithNum,
} from "../../DTOs/userOrder.dtos";
import type { UserBasicInfo } from "../../../../shared/types/interface";

//* 提交訂單
export const setPostUserOrderAsync = createAppAsyncThunk<string, UserBasicInfo>(
  "userOrder/setPostUserOrder",
  async (data, { rejectWithValue }) => {
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: { name, email, tel, address },
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${process.env.APP_API_PATH}/order`,
        form
      );
      return res.data.orderId;
    } catch (e) {
      const error = e as AxiosRejectTypes;

      if (!error.response) {
        throw e;
      }

      return rejectWithValue(error);
    }
  }
);

//* 取得單筆 user 訂單
export const fetchUserSingleOrderAsync = createAppAsyncThunk<
  OrderDetail,
  string
>("userOrder/fetchUserSingleOrder", async (orderId, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.APP_API_PATH}/order/${orderId}`
    );

    return res.data.order;
  } catch (e) {
    const error = e as AxiosRejectTypes;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});

//* 取得全部 user 訂單
export const fetchUserOrdersAsync = createAppAsyncThunk<
  OrderDetailWithNum[],
  void
>("userOrder/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/v2/api/${process.env.APP_API_PATH}/orders`);

    return res.data.orders;
  } catch (e) {
    const error = e as AxiosRejectTypes;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});
