import { createAppAsyncThunk } from "../redux-utils";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import type { AxiosError } from "axios";

//* 設定登入 token
export const setCurrentUserAsync = createAppAsyncThunk<
  boolean,
  { token: string; expired: string },
  { rejectValue: string }
>("user/setCurrentUser", async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await axios.post(`/v2/admin/signin`, data);
    const { token, expired } = res.data;

    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;

    dispatch(setHandleMessage({ type: "success", res }));
    return res.data.success;
  } catch (e) {
    const error = e as AxiosError<string>;
    if (!error.response) {
      throw e;
    }
    dispatch(setHandleMessage({ type: "error", res: error }));
    return rejectWithValue(error.response.data);
  }
});
