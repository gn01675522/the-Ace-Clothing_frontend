import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  fetchCartItemsAsync,
  setAddItemToCartAsync,
  setRemoveItemFromCartAsync,
  setUpdateCartItemAsync,
  setAddCouponForCartAsync,
} from "./cart.asyncThunk";

import type { AxiosRejectTypes } from "../../../store/redux-utils";
import type { Cart } from "../DTOs/cart.dtos";

type CartState = {
  readonly cart: Cart;
  readonly loadingItems: string[];
  readonly tempData: string | null;
  readonly isLoading: boolean;
  readonly isModalOpen: boolean;
  readonly error: AxiosRejectTypes | null;
};

export const INITIAL_STATE: CartState = {
  cart: { carts: [], total: 0, final_total: 0 },
  loadingItems: [],
  tempData: null,
  error: null,
  isLoading: false,
  isModalOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setCartIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setCartTempData(state, action: PayloadAction<string>) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //**************************************** 取得 API 內的 Carts 資料 Start ****************************************
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, { payload }) => {
        state.cart = payload;
        state.isLoading = false;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //**************************************** 取得 API 內的 Carts 資料 End ****************************************
      //**************************************** 於 API 內新增 Carts 資料 Start ****************************************
      .addCase(setAddItemToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAddItemToCartAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setAddItemToCartAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //**************************************** 於 API 內新增 Carts 資料 End ****************************************
      //**************************************** 於 API 內刪除 Carts 資料 Start ****************************************
      .addCase(setRemoveItemFromCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setRemoveItemFromCartAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setRemoveItemFromCartAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //**************************************** 於 API 內刪除 Carts 資料 End ****************************************
      //**************************************** 於 API 內更新 Carts 資料 Start ****************************************
      .addCase(setUpdateCartItemAsync.pending, (state, { meta }) => {
        state.loadingItems = [...state.loadingItems, meta.arg.item.id];
        state.isLoading = true;
      })
      .addCase(setUpdateCartItemAsync.fulfilled, (state) => {
        state.loadingItems = [];
        state.isLoading = false;
        //* 之所以 loadingItems 會使用空陣列是因為原先的防呆方法會在購物車內快速調整兩個商品的時候造成其中一個商品 select 被永久 disabled
      })
      .addCase(setUpdateCartItemAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //**************************************** 於 API 內更新 Carts 資料 End ****************************************
      .addCase(setAddCouponForCartAsync.pending, (state, { meta }) => {
        state.isLoading = true;
      })
      .addCase(setAddCouponForCartAsync.fulfilled, (state) => {
        state.isLoading = false;
        //* 之所以 loadingItems 會使用空陣列是因為原先的防呆方法會在購物車內快速調整兩個商品的時候造成其中一個商品 select 被永久 disabled
      })
      .addCase(setAddCouponForCartAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { setCartIsModalOpen, setCartTempData } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
