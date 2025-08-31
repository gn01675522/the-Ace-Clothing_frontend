import axios from "axios";

import { createAppAsyncThunk } from "../../../store/redux-utils";

import { setHandleMessage } from "../../../store/message/message.slice";

import type {
  AdminCouponDto,
  CreateCouponDto,
  FetchAdminCouponResDto,
} from "../DTOs/adminCoupon.dtos";
import type { PaginationType } from "../../../shared/types/types";
import type {
  APIResponse,
  APIRejectResponse,
  APIGeneralResDto,
} from "../../../shared/types";

//* 擷取 api 上關於 admin coupons 的資料
export const fetchAdminCouponsAsync = createAppAsyncThunk<
  { coupons: AdminCouponDto[]; pagination: PaginationType },
  number | undefined
>(
  "adminCoupons/fetchAdminCoupons",
  async (page = 1, { rejectWithValue, dispatch }) => {
    try {
      const res = (await axios.get(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupons?page=${page}`
      )) as APIResponse<FetchAdminCouponResDto>;

      return { coupons: res.data.coupons, pagination: res.data.pagination };
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

//* 刪除 api 上關於 admin coupons 的資料
export const deleteAdminCouponsAsync = createAppAsyncThunk<void, string>(
  "adminCoupons/deleteAdminCoupons",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.delete(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon/${id}`
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      dispatch(fetchAdminCouponsAsync());
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({
          type: error.response.data.success,
          res: error,
        })
      );

      return rejectWithValue(error);
    }
  }
);

//* 創造 admin coupons 資料
export const createAdminCouponAsync = createAppAsyncThunk<
  void,
  CreateCouponDto
>(
  "adminCoupons/createAdminCoupons",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.post(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon`,
        { data: formData }
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      dispatch(fetchAdminCouponsAsync());
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({
          type: error.response.data.success,
          res: error,
        })
      );

      return rejectWithValue(error);
    }
  }
);

//* 更新 api 上關於 admin coupons 的資料
export const updateAdminCouponAsync = createAppAsyncThunk<void, AdminCouponDto>(
  "adminCoupons/updateAdminCoupons",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/admin/coupon/${formData.id}`,
        { data: formData }
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      dispatch(fetchAdminCouponsAsync());
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({
          type: error.response.data.success,
          res: error,
        })
      );

      return rejectWithValue(error);
    }
  }
);
