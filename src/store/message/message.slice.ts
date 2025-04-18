import { createSlice } from "@reduxjs/toolkit";

import type { AxiosResponse } from "axios";
import type { AppDispatch } from "../store";
import type { AxiosRejectTypes } from "../redux-utils";

type Message = {
  type: "success" | "error" | "danger" | "";
  title: string;
  text: string;
};

type MessageState = {
  readonly hasMessage: boolean;
  readonly message: Message;
};

const INITIAL_STATE: MessageState = {
  hasMessage: false,
  message: { type: "", title: "", text: "" },
};

//********** Helper **********
const successMessageHelper = (res: { data: { message: string } }): Message => ({
  type: "success",
  title: "更新成功",
  text: res.data.message,
});

const errorMessageHelper = (error: {
  response: { data: { message: string } };
}): Message => ({
  type: "danger",
  title: "失敗",
  text: Array.isArray(error?.response?.data?.message)
    ? error?.response?.data?.message.join(",")
    : error?.response?.data?.message,
});
//********** Helper **********

export const messageSlice = createSlice({
  name: "message",
  initialState: INITIAL_STATE,
  reducers: {
    setClearMessage() {
      return INITIAL_STATE;
    },
    setMessage(state, action) {
      const { type, res } = action.payload;

      state.hasMessage = true;

      if (type === "success") {
        state.message = successMessageHelper(res);
      } else if (type === "error") {
        state.message = errorMessageHelper(res);
      }
    },
  },
});

const { setClearMessage, setMessage } = messageSlice.actions;

export const setHandleMessage =
  (payload: {
    res: AxiosRejectTypes | AxiosResponse;
    type: "success" | "error" | "";
  }) =>
  (dispatch: AppDispatch) => {
    dispatch(setMessage(payload));
    setTimeout(() => {
      dispatch(setClearMessage());
    }, 3000);
  };

export const messageReducer = messageSlice.reducer;
