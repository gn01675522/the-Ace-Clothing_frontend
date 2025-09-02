import { createContext } from "react";
import { useAppDispatch } from "../../../../../store/redux-hooks";

import { useAdminOrderModalFormControl } from "../hooks/admin-order-modal.hooks";

import {
  setClearOrderEditModalControl,
  setOrderEditModalIsOpen,
} from "../../../store/admin/adminOrder.slice";

import type { ReactNode } from "react";

type ContextType = {
  formControl: ReturnType<typeof useAdminOrderModalFormControl>;
  onCloseHandler: () => void;
  onSubmitHandler: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const OrderManagementContext = createContext<ContextType | null>(null);

export const OrderManagementContextProvider = ({
  children,
}: ContextPropsType) => {
  const formControl = useAdminOrderModalFormControl();

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    formControl.setFormData(null);
    dispatch(setClearOrderEditModalControl());
    dispatch(setOrderEditModalIsOpen(false));
  };

  const onSubmitHandler = () => {
    formControl.submitForm();
    onCloseHandler();
  };

  const value = { formControl, onCloseHandler, onSubmitHandler };

  return (
    <OrderManagementContext value={value}>{children}</OrderManagementContext>
  );
};
