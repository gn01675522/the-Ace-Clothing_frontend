import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAdminCouponsAsync,
  createAdminCouponAsync,
  deleteAdminCouponsAsync,
  updateAdminCouponAsync,
} from "./adminCoupon.asyncThunk";

import { FORM_OPERATION_OPTIONS } from "../../../shared/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosRejectTypes } from "../../../store/redux-utils";
import type { AdminCouponDto } from "../DTOs/adminCoupon.dtos";
import type { CouponEditModalType } from "../types/admin-coupon.types";
import type { PaginationType } from "../../../shared/types/types";

type AdminCouponState = {
  readonly coupons: AdminCouponDto[];
  readonly pagination: PaginationType | null;
  readonly error: AxiosRejectTypes | null;
  readonly isLoading: boolean;
  readonly couponEditModalControl: CouponEditModalType;
};

const INITIAL_STATE: AdminCouponState = {
  coupons: [],
  pagination: null,
  isLoading: false,
  error: null,
  couponEditModalControl: {
    isOpen: false,
    type: FORM_OPERATION_OPTIONS.create,
    targetData: null,
  },
};

export const adminCouponSlice = createSlice({
  name: "adminCoupon",
  initialState: INITIAL_STATE,
  reducers: {
    setClearAdminCouponState() {
      return INITIAL_STATE;
    },
    setClearCouponEditModalControl(state) {
      state.couponEditModalControl = INITIAL_STATE.couponEditModalControl;
    },
    setCouponEditModalOpenAndSetting(
      state,
      actions: PayloadAction<Omit<CouponEditModalType, "isOpen">>
    ) {
      state.couponEditModalControl = {
        isOpen: true,
        ...actions.payload,
      };
    },
    setCouponEditModalIsOpen(state, actions: PayloadAction<boolean>) {
      state.couponEditModalControl = {
        ...state.couponEditModalControl,
        isOpen: actions.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //**************************************** 取得 API 內的 Admin Coupons 資料 Start ****************************************
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
      //**************************************** 取得 API 內的 Admin Coupons 資料 End ****************************************
      //**************************************** 刪除 API 內的 Admin Coupons 資料 Start ****************************************
      .addCase(deleteAdminCouponsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminCouponsAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAdminCouponsAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //**************************************** 刪除 API 內的 Admin Coupons 資料 End ****************************************
      //**************************************** 於 API 內創建 Admin Coupons 資料 Start ****************************************
      .addCase(createAdminCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminCouponAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createAdminCouponAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //**************************************** 於 API 內創建 Admin Coupons 資料 End ****************************************
      //**************************************** 更新 API 內的 Admin Coupons 資料 Start ****************************************
      .addCase(updateAdminCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminCouponAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAdminCouponAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
    //**************************************** 更新 API 內的 Admin Coupons 資料 End ****************************************
  },
});

export const {
  setClearAdminCouponState,
  setClearCouponEditModalControl,
  setCouponEditModalIsOpen,
  setCouponEditModalOpenAndSetting,
} = adminCouponSlice.actions;
export const adminCouponReducer = adminCouponSlice.reducer;
