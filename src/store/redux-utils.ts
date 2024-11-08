import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";

import type { AxiosError } from "axios";

export type RejectTypes = {
  error: string;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: AxiosError<RejectTypes>;
}>();
