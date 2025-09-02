import axios from "axios";

import { createAppAsyncThunk } from "../../../store/redux-utils";

import { setHandleMessage } from "../../../store/message/message.slice";

import type {
  APIResponse,
  APIRejectResponse,
  APIGeneralResDto,
} from "../../../shared/types";
import type {
  CartItemDto,
  CartInfoDto,
  FetchCartItemsResDto,
  CartItemAddToCart,
} from "../DTOs/cart.dtos";

//* fetch 目前的購物車內商品資訊
export const fetchCartItemsAsync = createAppAsyncThunk<CartInfoDto, void>(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = (await axios.get(
        `/v2/api/${process.env.APP_API_PATH}/cart`
      )) as APIResponse<FetchCartItemsResDto>;

      return res.data.cart;
    } catch (e) {
      const error = e as APIRejectResponse;

      if (!error.response) {
        throw e;
      }

      return rejectWithValue(error);
    }
  }
);

//* 新增商品至購物車
export const setAddItemToCartAsync = createAppAsyncThunk<
  void,
  { data: CartItemAddToCart }
>("cart/setAddItemToCart", async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = (await axios.post(
      `/v2/api/${process.env.APP_API_PATH}/cart`,
      data
    )) as APIResponse<APIGeneralResDto>;

    dispatch(setHandleMessage({ type: res.data.success, res }));

    dispatch(fetchCartItemsAsync());
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

//* 從購物車內移除商品
export const setRemoveItemFromCartAsync = createAppAsyncThunk<void, string>(
  "cart/setRemoveItemfromCart",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.delete(
        `/v2/api/${process.env.APP_API_PATH}/cart/${id}`
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      dispatch(fetchCartItemsAsync());
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

//* 修改購物車內商品
export const setUpdateCartItemAsync = createAppAsyncThunk<
  void,
  { item: CartItemDto; quantity: number }
>(
  "cart/setUpdateCartItem",
  async ({ item, quantity }, { dispatch, rejectWithValue }) => {
    const data = {
      data: { product_id: item.product_id, qty: quantity },
    };
    try {
      const res = (await axios.put(
        `/v2/api/${process.env.APP_API_PATH}/cart/${item.id}`,
        data
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));

      dispatch(fetchCartItemsAsync());
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

//* 於購物車內加入 coupon
export const setAddCouponForCartAsync = createAppAsyncThunk<void, string>(
  "client/setAddCouponForCart",
  async (code, { dispatch, rejectWithValue }) => {
    try {
      const res = (await axios.post(
        `v2/api/${process.env.APP_API_PATH}/coupon`,
        {
          data: { code },
        }
      )) as APIResponse<APIGeneralResDto>;

      dispatch(setHandleMessage({ type: res.data.success, res }));
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
