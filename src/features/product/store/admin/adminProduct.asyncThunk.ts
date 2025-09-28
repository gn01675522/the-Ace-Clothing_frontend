import api from "@/shared/api/axios";
import { createAppAsyncThunk } from "@/store/redux-utils";

import { setHandleMessage } from "@/store/message/message.slice";

import type { AxiosResponse } from "axios";
import type { AxiosRejectTypes } from "@/store/redux-utils";
import type {
  FetchAdminProductsResDto,
  ProductEditDataReqDTO,
  ProductCreateDataReqDTO,
} from "../../DTOs/adminProduct.dtos";
import type { APIRejectResponse } from "@/shared/types";
import type { APIResDTO } from "@/shared/DTOs/api.dtos";

//* 取得 product data
export const fetchAdminProductAsync = createAppAsyncThunk<
  AxiosResponse<FetchAdminProductsResDto>,
  { current_page?: number; per_page?: number } | undefined
>("adminProduct/fetchAdminProduct", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get(`/product`, {
      params: {
        current_page: params?.current_page ?? 1,
        per_page: params?.per_page ?? 10,
      },
    });

    return res;
  } catch (e) {
    const error = e as APIRejectResponse;

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
      const res = (await api.delete(
        `/product/${id}`
      )) as AxiosResponse<APIResDTO>;

      dispatch(setHandleMessage({ isSuccess: res.data.success, res: res }));

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminProductAsync());
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({ isSuccess: error.response.data.success, res: error })
      );

      return rejectWithValue(error);
    }
  }
);

//* 更新 products data
export const updateAdminProductAsync = createAppAsyncThunk<
  void,
  ProductEditDataReqDTO
>(
  "adminProduct/updateAdminProduct",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = (await api.put(
        `/product/${data._id}`,
        data
      )) as AxiosResponse;

      dispatch(
        setHandleMessage({
          isSuccess: res.data.success,
          res: res,
        })
      );

      //* 刪除完畢後重新 fetch 產品列表
      dispatch(fetchAdminProductAsync());
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      dispatch(
        setHandleMessage({ isSuccess: error.response.data.success, res: error })
      );

      return rejectWithValue(error);
    }
  }
);

//* 新增 products data
export const createAdminProductAsync = createAppAsyncThunk<
  void,
  ProductCreateDataReqDTO
>(
  "adminProduct/createAdminProduct",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = (await api.post(`/product`, data)) as AxiosResponse;

      // dispatch(setHandleMessage({ type: res.data.success, res }));

      dispatch(fetchAdminProductAsync());
    } catch (e) {
      const error = e as AxiosRejectTypes;

      if (!error.response) {
        throw e;
      }

      // dispatch(
      //   setHandleMessage({ type: error.response.data.success, res: error })
      // );

      return rejectWithValue(error);
    }
  }
);
