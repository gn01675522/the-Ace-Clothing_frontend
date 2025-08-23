import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { AdminOrderContext } from "../contexts/admin-order.contexts";

import { setClearAdminOrderState } from "../store/admin/adminOrder.slice";
import {
  fetchAdminOrdersAsync,
  updateAdminOrdersAsync,
} from "../store/admin/adminOrder.asyncThunk";
import {
  selectAdminOrders,
  selectAdminOrdersPagination,
  selectAdminOrdersIsLoading,
} from "../store/admin/adminOrder.selector";

import type { ChangeEvent } from "react";

import type { Order } from "../DTOs/adminOrders.dtos";

export const useAdminOrderContext = () => {
  const context = useContext(AdminOrderContext);

  if (!context)
    throw new Error(
      "useAdminOrderContext must be used within AdminOrderContextProvider"
    );

  return context;
};

export const useAdminOrderModalFormControl = () => {
  const [targetData, setTargetData] = useState<Order | null>(null);
  const [formData, setFormData] = useState<Order | null>(null);

  const dispatch = useAppDispatch();

  //* 捕捉 input 輸入，並根據輸入資料種類來修改 formData
  const onChangeHandler = (
    e: ChangeEvent<HTMLSelectElement & HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    if (name === "is_paid") {
      setFormData((prev) => (prev ? { ...prev, [name]: checked } : prev));
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const submitForm = () => dispatch(updateAdminOrdersAsync(formData as Order));

  useEffect(() => {
    if (targetData) setFormData({ ...targetData });
  }, [targetData]);

  return {
    formData,
    targetData,
    setTargetData,
    setFormData,
    onChangeHandler,
    submitForm,
  };
};

export const useAdminOrderModalControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchAdminOrderModalOpen = () => setIsModalOpen(!isModalOpen);

  return { isModalOpen, setIsModalOpen, switchAdminOrderModalOpen };
};

export const useAdminOrderStateFetch = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectAdminOrders);
  const pagination = useAppSelector(selectAdminOrdersPagination);
  const isLoading = useAppSelector(selectAdminOrdersIsLoading);

  useEffect(() => {
    dispatch(fetchAdminOrdersAsync());
    return () => {
      setClearAdminOrderState();
    };
  }, []);

  return { orders, pagination, isLoading };
};
