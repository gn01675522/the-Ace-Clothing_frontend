import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  fetchAdminOrdersAsync,
  updateAdminOrdersAsync,
  deleteAdminOrdersAsync,
} from "./adminOrder.asyncThunk";

import type { AxiosRejectTypes } from "../../../../store/redux-utils";
import type { Order } from "../../DTOs/adminOrders.dtos";
import type { PaginationType } from "../../../../shared/types/types";

type AdminOrderState = {
  readonly orders: Order[];
  readonly pagination: PaginationType | null;
  readonly tempData: Order | null;
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
};

const INITIAL_STATE: AdminOrderState = {
  orders: [],
  pagination: null,
  tempData: null,
  isLoading: false,
  error: null,
};

export const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminOrdersTempData(state, action: PayloadAction<Order>) {
      state.tempData = action.payload;
    },
    setClearAdminOrderState() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminOrdersAsync.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.pagination = payload.pagination;
        state.isLoading = false;
      })
      .addCase(fetchAdminOrdersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 取得 API 內的 Admin Orders 資料 ****************************************

      .addCase(updateAdminOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminOrdersAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAdminOrdersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      //* 更新 API 內的 Admin Orders 資料 ****************************************

      .addCase(deleteAdminOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminOrdersAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAdminOrdersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
    //*  刪除 API 內的 Admin Orders 資料 ****************************************
  },
});

export const { setAdminOrdersTempData, setClearAdminOrderState } =
  adminOrderSlice.actions;
export const adminOrderReducer = adminOrderSlice.reducer;
