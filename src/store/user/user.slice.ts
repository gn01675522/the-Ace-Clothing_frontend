import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setCurrentUserAsync } from "./user.asyncThunk";

import type { AxiosRejectTypes } from "../redux-utils";

type UserState = {
  readonly isSuccess: boolean;
  readonly favorite: string[];
  readonly isLoading: boolean;
  readonly message: string;
  readonly error: AxiosRejectTypes | null;
};

const INITIAL_STATE: UserState = {
  isSuccess: false,
  favorite: JSON.parse(localStorage.getItem("wishlist") as string) || [],
  message: "",
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserFavorite(state, action: PayloadAction<string[]>) {
      state.favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrentUserAsync.fulfilled, (state, { payload }) => {
        state.isSuccess = payload;
        state.isLoading = false;
      })
      .addCase(setCurrentUserAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { setUserFavorite } = userSlice.actions;
export const userReducer = userSlice.reducer;
