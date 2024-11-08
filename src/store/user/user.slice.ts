import { createSlice } from "@reduxjs/toolkit";

import { setCurrentUserAsync } from "./user.asyncThunk";

type UserState = {
  readonly isSuccess: boolean;
  readonly message: string;
  readonly favorite: string[];
  readonly isLoading: boolean;
};

const INITIAL_STATE: UserState = {
  isSuccess: false,
  message: "",
  favorite: JSON.parse(localStorage.getItem("wishlist") as string) || [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserFavorite(state, action) {
      state.favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCurrentUserAsync.fulfilled, (state, action) => {
        state.isSuccess = action.payload;
        state.isLoading = false;
      })
      .addCase(setCurrentUserAsync.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.message = action.payload;
        }
        state.isLoading = false;
      });
  },
});

export const { setUserFavorite } = userSlice.actions;
export const userReducer = userSlice.reducer;
