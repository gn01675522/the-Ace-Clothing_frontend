import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCartItemsAsync,
  setAddItemToCartAsync,
  setRemoveItemFromCartAsync,
  setUpdateCartItemAsync,
} from "./cart.asyncThunk";

import type { CartItems, Cart } from "./cart.types";

type CartState = {
  readonly cart: Cart;
  readonly loadingItems: CartItems[];
  readonly tempData: null;
  readonly isLoading: boolean;
  readonly isModalOpen: boolean;
  readonly error: string | null;
};

const INITIAL_STATE: CartState = {
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
    setCartIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setCartTempData(state, action) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //**************************************** 取得 API 內的 Carts 資料 Start ****************************************
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
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
      .addCase(setAddItemToCartAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
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
      .addCase(setRemoveItemFromCartAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
        state.isLoading = false;
      })
      //**************************************** 於 API 內刪除 Carts 資料 End ****************************************
      //**************************************** 於 API 內更新 Carts 資料 Start ****************************************
      .addCase(setUpdateCartItemAsync.pending, (state, action) => {
        // state.loadingItems = [...state.loadingItems, action.meta.arg.item.id];
        state.isLoading = true;
      })
      .addCase(setUpdateCartItemAsync.fulfilled, (state) => {
        state.loadingItems = [];
        state.isLoading = false;
        //* 之所以 loadingItems 會使用空陣列是因為原先的防呆方法會在購物車內快速調整兩個商品的時候造成其中一個商品 select 被永久 disabled
      })
      .addCase(setUpdateCartItemAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
    //**************************************** 於 API 內更新 Carts 資料 End ****************************************
  },
});

export const { setCartIsModalOpen, setCartTempData } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
