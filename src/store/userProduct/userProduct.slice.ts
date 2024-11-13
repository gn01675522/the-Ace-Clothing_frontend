import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUserProductAsync,
  fetchUserSingleProductAsync,
} from "./userProduct.asyncThunk";

import type { AxiosRejectTypes } from "../redux-utils";
import type { Product, ProductWithId } from "./userProduct.types";

type UserProductState = {
  readonly products: Product[];
  readonly product: Product | null;
  readonly pagination: {};
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
};

const INITIAL_STATE: UserProductState = {
  products: [],
  product: null,
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
      .addCase(fetchUserProductAsync.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })

      .addCase(fetchUserSingleProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserSingleProductAsync.fulfilled, (state, { payload }) => {
        state.product = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserSingleProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { clearUserProduct } = userProductSlice.actions;
export const userProductReducer = userProductSlice.reducer;
