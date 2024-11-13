import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  fetchAdminCouponsAsync,
  createAdminCouponAsync,
  deleteAdminCouponsAsync,
  updateAdminCouponAsync,
} from "./adminCoupon.asyncThunk";

import type { AxiosRejectTypes } from "../redux-utils";
import type { AdminCoupon, AdminCouponWithId } from "./adminCoupon.types";
import type { Pagination } from "../../shared/types/types";

type AdminCouponState = {
  readonly coupons: AdminCoupon[];
  readonly pagination: Pagination | null;
  readonly tempData: AdminCouponWithId | null;
  readonly isModalOpen: boolean;
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
};

const INITIAL_STATE: AdminCouponState = {
  coupons: [],
  pagination: null,
  tempData: null,
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminCouponSlice = createSlice({
  name: "adminCoupon",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminCouponsOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setAdminCouponsTempData(state, action: PayloadAction<AdminCouponWithId>) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCouponsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminCouponsAsync.fulfilled, (state, { payload }) => {
        state.coupons = payload.coupons;
        state.pagination = payload.pagination;
        state.isLoading = false;
      })
      .addCase(fetchAdminCouponsAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 取得 API 內的 Admin Coupons 資料 ****************************************

      .addCase(deleteAdminCouponsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminCouponsAsync.fulfilled, (state) => {
        state.isModalOpen = false;
        state.isLoading = false;
      })
      .addCase(deleteAdminCouponsAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 刪除 API 內的 Admin Coupons 資料 ****************************************

      .addCase(createAdminCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminCouponAsync.fulfilled, (state) => {
        state.isModalOpen = false;
        state.isLoading = false;
      })
      .addCase(createAdminCouponAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 於 API 內創建 Admin Coupons 資料 ****************************************

      .addCase(updateAdminCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminCouponAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(updateAdminCouponAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
    //* 更新 API 內的 Admin Coupons 資料 ****************************************
  },
});

export const { setAdminCouponsOpen, setAdminCouponsTempData } =
  adminCouponSlice.actions;
export const adminCouponReducer = adminCouponSlice.reducer;
