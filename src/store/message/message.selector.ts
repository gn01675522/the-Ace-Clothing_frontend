import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectMessageReducer = (state: RootState) => state.message;
//* 選取 rootReducer 上的 message reducer

export const selectHasMessage = createSelector(
  [selectMessageReducer],
  (message) => message.hasMessage
);

export const selectMessage = createSelector(
  [selectMessageReducer],
  (message) => message.message
);
