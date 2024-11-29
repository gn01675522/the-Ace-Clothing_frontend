import { createAppAsyncThunk } from "../redux-utils";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import type { AxiosResponse } from "axios";
import type { AxiosRejectTypes } from "../redux-utils";
import type { AdminCoupon, AdminCouponWithId } from "./adminCoupon.types";
import type { Pagination } from "../../shared/types/types";

//******************** Helper ********************
//* 這個 helper 會在每次操作 api 時候 (新增、更新)，把資料帶來此處來進行處理，主要目標為時間格式轉換
const formatDataHelper = <T>(formData: T, date: Date): T => {
  const time = date.getTime();
  const newFormData = { ...formData, due_date: time };
  return newFormData;
};

//******************** Helper ********************
//* 擷取 api 上關於 admin coupons 的資料
export const fetchAdminCouponsAsync = createAppAsyncThunk<
  { coupons: AdminCoupon[]; pagination: Pagination },
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
  { formData: AdminCoupon; date: Date }
>(
  "adminCoupons/createAdminCoupons",
  async ({ formData, date }, { dispatch, rejectWithValue }) => {
    const newFormData = formatDataHelper(formData, date);

    try {
      const res = (await axios.post(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon`,
        { data: newFormData }
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
  { formData: AdminCouponWithId; date: Date }
>(
  "adminCoupons/updateAdminCoupons",
  async ({ formData, date }, { dispatch, rejectWithValue }) => {
    const newFormData = formatDataHelper(formData, date);

    try {
      const res = (await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon/${newFormData.id}`,
        { data: newFormData }
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
