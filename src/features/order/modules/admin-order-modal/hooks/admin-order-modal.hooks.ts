import { useState, useEffect, useContext } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/redux-hooks";

import { OrderManagementContext } from "../contexts/admin-order-modal.contexts";

import { updateAdminOrdersAsync } from "../../../store/admin/adminOrder.asyncThunk";
import { selectAdminOrderEditModalTargetData } from "../../../store/admin/adminOrder.selector";

import type { ChangeEvent } from "react";
import type { AdminOrderDto } from "../../../DTOs/adminOrders.dtos";

export const useOrderManagementContext = () => {
  const context = useContext(OrderManagementContext);

  if (!context)
    throw new Error(
      "useOrderManagementContext must be used within OrderManagementContextProvider"
    );

  return context;
};

export const useAdminOrderModalFormControl = () => {
  const [formData, setFormData] = useState<AdminOrderDto | null>(null);

  const targetData = useAppSelector(selectAdminOrderEditModalTargetData);

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

  const submitForm = () => {
    if (formData) dispatch(updateAdminOrdersAsync(formData));
  };

  useEffect(() => {
    if (targetData) setFormData({ ...targetData });
  }, [targetData]);

  return {
    formData,
    targetData,
    setFormData,
    onChangeHandler,
    submitForm,
  };
};
