import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  fetchAdminProductAsync,
  deleteAdminProductAsync,
  updateAdminProductAsync,
  createAdminProductAsync,
} from "./adminProduct.asyncThunk";

import type { AxiosRejectTypes } from "../redux-utils";
import type { AdminProduct } from "./adminProduct.types";

type AdminProductState = {
  readonly products: AdminProduct[];
  readonly tempData: AdminProduct | null;
  readonly isModalOpen: boolean;
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
};

const INITIAL_STATE: AdminProductState = {
  products: [],
  tempData: null,
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminProductTempData(state, action: PayloadAction<AdminProduct>) {
      state.tempData = action.payload;
    },
    setAdminProductModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminProductAsync.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.isLoading = false;
      })
      .addCase(fetchAdminProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 取得 API 內的 Admin Products 資料 ****************************************

      .addCase(deleteAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(deleteAdminProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 刪除 API 內的 Admin Products 資料 ****************************************

      .addCase(updateAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(updateAdminProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 更新 API 內的 Admin Products 資料 ****************************************

      .addCase(createAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(createAdminProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
    //* 於 API 內創造 Admin Products 資料 ****************************************
  },
});

export const { setAdminProductModalOpen, setAdminProductTempData } =
  adminProductSlice.actions;
export const adminProductReducer = adminProductSlice.reducer;
