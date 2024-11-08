import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUserProductAsync,
  fetchUserSingleProductAsync,
} from "./userProduct.asyncThunk";

import type { Product } from "./userProduct.types";

type UserProductState = {
  readonly products: Product[];
  readonly product: Product | {};
  readonly pagination: {};
  readonly isLoading: boolean;
  readonly error: string | null;
};

const INITIAL_STATE: UserProductState = {
  products: [],
  product: {},
  pagination: {},
  isLoading: false,
  error: null,
};

export const userProductSlice = createSlice({
  name: "userProduct",
  initialState: INITIAL_STATE,
  reducers: {
    clearUserProduct() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProductAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserProductAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
        state.isLoading = false;
      })

      .addCase(fetchUserSingleProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserSingleProductAsync.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserSingleProductAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
  },
});

export const { clearUserProduct } = userProductSlice.actions;
export const userProductReducer = userProductSlice.reducer;
