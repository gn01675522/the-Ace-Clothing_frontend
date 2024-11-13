import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  fetchAdminOrdersAsync,
  updateAdminOrdersAsync,
  deleteAdminOrdersAsync,
} from "./adminOrder.asyncThunk";

import type { AxiosRejectTypes } from "../redux-utils";
import type { Order } from "./adminOrders.type";
import type { Pagination } from "../../shared/types/types";

type AdminOrderState = {
  readonly orders: Order[];
  readonly pagination: Pagination | null;
  readonly tempData: Order | null;
  readonly isModalOpen: boolean;
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
};

const INITIAL_STATE: AdminOrderState = {
  orders: [],
  pagination: null,
  tempData: null,
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminOrdersIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setAdminOrdersTempData(state, action: PayloadAction<Order>) {
      state.tempData = action.payload;
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
        state.isModalOpen = false;
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
        state.isModalOpen = false;
      })
      .addCase(deleteAdminOrdersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
    //*  刪除 API 內的 Admin Orders 資料 ****************************************
  },
});

export const { setAdminOrdersIsModalOpen, setAdminOrdersTempData } =
  adminOrderSlice.actions;
export const adminOrderReducer = adminOrderSlice.reducer;
