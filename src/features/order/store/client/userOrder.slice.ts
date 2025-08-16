import { createSlice } from "@reduxjs/toolkit";

import {
  setPostUserOrderAsync,
  fetchUserSingleOrderAsync,
  fetchUserOrdersAsync,
} from "./userOrder.asyncThunk";

import { OrderDetail, OrderDetailWithNum } from "../../DTOs/userOrder.types";

type UserOrderState = {
  readonly orders: OrderDetailWithNum[];
  readonly orderData: OrderDetail | null;
  readonly orderId: string | null;
  readonly error: Error | null;
  readonly isLoading: boolean;
};

const INITIAL_STATE: UserOrderState = {
  orders: [],
  orderData: null,
  orderId: null,
  error: null,
  isLoading: false,
};

export const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: INITIAL_STATE,
  reducers: {
    setClearUserOrderState() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPostUserOrderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPostUserOrderAsync.fulfilled, (state, { payload }) => {
        state.orderId = payload;
        state.isLoading = false;
      })
      .addCase(setPostUserOrderAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserSingleOrderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserSingleOrderAsync.fulfilled, (state, { payload }) => {
        state.orderData = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserSingleOrderAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { setClearUserOrderState } = userOrderSlice.actions;
export const userOrderReducer = userOrderSlice.reducer;
