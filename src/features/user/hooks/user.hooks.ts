import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";
import { useNavigate } from "react-router-dom";

import { setCurrentUserAsync } from "../store/user.asyncThunk";
import {
  selectUserLoginIsSuccess,
  selectUserLoginIsLoading,
  selectUserLoginMessage,
} from "../store/user.selector";
import { selectHasMessage } from "../../../store/message/message.selector";

import type { ChangeEvent } from "react";

export const useLoginFormControl = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  //* 取得 user 輸入資料
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  //* 點選登入後，使用 redux 來登入
  const onSubmitHandler = () => dispatch(setCurrentUserAsync(data));

  return { data, handleChange, onSubmitHandler };
};

export const useNavigateWhenLoginSuccess = () => {
  const isSuccess = useAppSelector(selectUserLoginIsSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess === true) {
      navigate("/admin/products");
    }
  }, [isSuccess, navigate]);
};

export const useFetchUserState = () => {
  const isLoading = useAppSelector(selectUserLoginIsLoading);
  const hasMessage = useAppSelector(selectHasMessage);
  const message = useAppSelector(selectUserLoginMessage);

  return { isLoading, hasMessage, message };
};
