import axios from "axios";
import { createAppAsyncThunk } from "../../../../store/redux-utils";

import { setHandleMessage } from "../../../../store/message/message.slice";

import type { UserProductsDto } from "../../DTOs/userProduct.dtos";
import type { APIRejectResponse } from "../../../../shared/types";

//* 取得 api 裡面全部的產品資訊
export const fetchUserProductAsync = createAppAsyncThunk<
  UserProductsDto[],
  void
>("userProduct/fetchUserProduct", async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.APP_API_PATH}/products/all`
    );

    return res.data.products;
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
});

//* 讓 api 根據我們傳入的 id 來找到我們要的產品
export const fetchUserSingleProductAsync = createAppAsyncThunk<
  UserProductsDto,
  string
>(
  "userProduct/fetchUserSingleProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.APP_API_PATH}/product/${id}`
      );

      return productRes.data.product;
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
