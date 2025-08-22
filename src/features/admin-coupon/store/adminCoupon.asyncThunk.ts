import { createAppAsyncThunk } from "../../../store/redux-utils";
import axios from "axios";

import { setHandleMessage } from "../../../store/message/message.slice";

import type { AxiosResponse } from "axios";
import type { AxiosRejectTypes } from "../../../store/redux-utils";
import type {
  IGetAdminCoupon,
  ICreateAdminCoupon,
} from "../DTOs/adminCoupon.dtos";
import type { PaginationType } from "../../../shared/types/types";

//* 擷取 api 上關於 admin coupons 的資料
export const fetchAdminCouponsAsync = createAppAsyncThunk<
  { coupons: IGetAdminCoupon[]; pagination: PaginationType },
  number | undefined
>("adminCoupons/fetchAdminCoupons", async (page = 1, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.APP_API_PATH}/admin/coupons?page=${page}`
    );

    return { coupons: res.data.coupons, pagination: res.data.pagination };
  } catch (e) {
    const error = e as AxiosRejectTypes;

    if (!error.response) {
      throw e;
    }

    return rejectWithValue(error);
  }
});

//* 刪除 api 上關於 admin coupons 的資料
export const deleteAdminCouponsAsync = createAppAsyncThunk<void, string>(
  "adminCoupons/deleteAdminCoupons",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.delete(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon/${id}`
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      dispatch(fetchAdminCouponsAsync());
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

//* 創造 admin coupons 資料
export const createAdminCouponAsync = createAppAsyncThunk<
  void,
  ICreateAdminCoupon
>(
  "adminCoupons/createAdminCoupons",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.post(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon`,
        { data: formData }
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      dispatch(fetchAdminCouponsAsync());
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

//* 更新 api 上關於 admin coupons 的資料
export const updateAdminCouponAsync = createAppAsyncThunk<
  void,
  IGetAdminCoupon
>(
  "adminCoupons/updateAdminCoupons",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon/${formData.id}`,
        { data: formData }
      )) as AxiosResponse;

      dispatch(setHandleMessage({ type: "success", res }));

      dispatch(fetchAdminCouponsAsync());
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
