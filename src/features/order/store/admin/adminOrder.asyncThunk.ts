import axios from "axios";

import { createAppAsyncThunk } from "../../../../store/redux-utils";

import { setHandleMessage } from "../../../../store/message/message.slice";

import type { AxiosRejectTypes } from "../../../../store/redux-utils";
import type { PaginationType } from "../../../../shared/types/types";
import type {
  AdminOrderDto,
  FetchAdminOrderResDto,
} from "../../DTOs/adminOrders.dtos";
import type {
  APIResponse,
  APIRejectResponse,
  APIGeneralResDto,
} from "../../../../shared/types";

//* 擷取 admin orders api 中的資料
export const fetchAdminOrdersAsync = createAppAsyncThunk<
  { orders: AdminOrderDto[]; pagination: PaginationType },
  number | undefined
>("adminOrders/fetchAdminOrders", async (page = 1, { rejectWithValue }) => {
  try {
    const res = (await axios.get(
      `/v2/api/${process.env.APP_API_PATH}/admin/orders?page=${page}`
    )) as APIResponse<FetchAdminOrderResDto>;

    return {
      orders: res.data.orders,
      pagination: res.data.pagination,
    };
  } catch (e) {
    const error = e as APIRejectResponse;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});

//* 更新 admin orders api 中的資料
export const updateAdminOrdersAsync = createAppAsyncThunk<void, AdminOrderDto>(
  "adminOrders/updateAdminOrders",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/admin/order/${data.id}`,
        { data }
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminOrdersAsync());
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({ type: error.response.data.success, res: error })
      );

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
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminOrdersAsync());
    } catch (e) {
      const error = e as AxiosRejectTypes;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({ type: error.response.data.success, res: error })
      );

      return rejectWithValue(error);
    }
  }
);
