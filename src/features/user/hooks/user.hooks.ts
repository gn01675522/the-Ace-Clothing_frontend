import { useState, useEffect, useLayoutEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/redux-hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    setData((prev) => ({ ...prev, [name]: value }));
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

export const useAdminUserAuth = () => {
  const hasMessage = useAppSelector(selectHasMessage);

  const navigate = useNavigate();

  //* 擷取瀏覽器 token
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  //* axios 預設 headers 必須夾帶 Auth token 以便驗證
  axios.defaults.headers.common["Authorization"] = token;

  //* 登出功能，設定 hexToken 為空值
  const logout = () => {
    document.cookie = `hexToken=;`;
    navigate("/login");
  };

  useLayoutEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    (async () => {
      try {
        await axios.post("/v2/api/user/check");
      } catch (e) {
        const error = e as { response: { data: { success: boolean } } };
        if (!error.response.data.success) {
          navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return { logout, hasMessage };
};
