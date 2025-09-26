import {
  createAppAsyncThunk,
  type AxiosRejectTypes,
} from "../../../store/redux-utils";

import api from "@/shared/api/axios";

import { setHandleMessage } from "../../../store/message/message.slice";

import type { AxiosResponse } from "axios";

//* 設定登入 token
export const setCurrentUserAsync = createAppAsyncThunk<
  boolean,
  { username: string; password: string }
>("user/setCurrentUser", async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = (await api.post(`/v2/admin/signin`, data)) as AxiosResponse;
    const { token, expired } = res.data;

    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;

    dispatch(setHandleMessage({ type: res.data.success, res }));

    return res.data.success;
  } catch (e) {
    const error = e as AxiosRejectTypes;

    if (!error.response) {
      throw e;
    }

    dispatch(
      setHandleMessage({ type: error.response.data.success, res: error })
    );

    return rejectWithValue(error);
  }
});
