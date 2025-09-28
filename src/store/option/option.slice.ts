import { createSlice } from "@reduxjs/toolkit";

import {
  fetchOptionProductCategoriesAsync,
  fetchOptionGendersAsync,
} from "./option.asyncThunk";

import type { AxiosRejectTypes } from "@/store/redux-utils";
import type { ProductCategoryDTO } from "@/shared/DTOs/option.dtos";
import type { GenderDTO } from "@/shared/DTOs/option.dtos";

type AdminOrderState = {
  readonly productCategories: ProductCategoryDTO[];
  readonly productCateogryTree: any[];
  readonly genders: GenderDTO[];
  readonly isLoading: boolean;
  readonly error: AxiosRejectTypes | null;
};

export const INITIAL_STATE: AdminOrderState = {
  productCategories: [],
  productCateogryTree: [],
  genders: [],
  isLoading: false,
  error: null,
};

export const optionSlice = createSlice({
  name: "option",
  initialState: INITIAL_STATE,
  reducers: {
    setClearOptionState() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptionProductCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOptionProductCategoriesAsync.fulfilled,
        (state, { payload }) => {
          state.productCategories = payload.data.data;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchOptionProductCategoriesAsync.rejected,
        (state, { payload }) => {
          if (payload) state.error = payload;
          state.isLoading = false;
        }
      )

      .addCase(fetchOptionGendersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOptionGendersAsync.fulfilled, (state, { payload }) => {
        state.genders = payload.data.data;
        state.isLoading = false;
      })
      .addCase(fetchOptionGendersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { setClearOptionState } = optionSlice.actions;
export const optionReducer = optionSlice.reducer;
