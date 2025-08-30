import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAdminProductAsync,
  deleteAdminProductAsync,
  updateAdminProductAsync,
  createAdminProductAsync,
} from "./adminProduct.asyncThunk";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosRejectTypes } from "../../../../store/redux-utils";
import type { IGetAdminProduct } from "../../DTOs/adminProduct.types";
import type { ProductEditModalType } from "../../types/admin-product.types";

type AdminProductState = {
  readonly products: IGetAdminProduct[];
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
  readonly productEditModalControl: ProductEditModalType;
};

const INITIAL_STATE: AdminProductState = {
  products: [],
  isLoading: false,
  error: null,
  productEditModalControl: {
    isOpen: false,
    type: FORM_OPERATION_OPTIONS.create,
    targetData: null,
  },
};

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: INITIAL_STATE,
  reducers: {
    setClearAdminProductState() {
      return INITIAL_STATE;
    },
    setClearProductEditModalControl(state) {
      state.productEditModalControl = INITIAL_STATE.productEditModalControl;
    },
    setProductEditModalTargetData(
      state,
      actions: PayloadAction<IGetAdminProduct>
    ) {
      state.productEditModalControl = {
        ...state.productEditModalControl,
        targetData: actions.payload,
      };
    },
    setProductEditModalIsOpen(state, actions: PayloadAction<boolean>) {
      state.productEditModalControl = {
        ...state.productEditModalControl,
        isOpen: actions.payload,
      };
    },
    setProductEditModalType(
      state,
      actions: PayloadAction<FORM_OPERATION_OPTIONS>
    ) {
      state.productEditModalControl = {
        ...state.productEditModalControl,
        type: actions.payload,
      };
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
      })
      .addCase(createAdminProductAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
    //* 於 API 內創造 Admin Products 資料 ****************************************
  },
});

export const {
  setClearAdminProductState,
  setClearProductEditModalControl,
  setProductEditModalTargetData,
  setProductEditModalIsOpen,
  setProductEditModalType,
} = adminProductSlice.actions;
export const adminProductReducer = adminProductSlice.reducer;
