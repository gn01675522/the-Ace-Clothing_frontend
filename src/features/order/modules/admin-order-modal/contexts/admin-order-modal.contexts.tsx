import { createContext } from "react";

import {
  useAdminOrderEditModalControl,
  useAdminOrderModalFormControl,
} from "../hooks/admin-order-modal.hooks";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminOrderEditModalControl>;
  formControl: ReturnType<typeof useAdminOrderModalFormControl>;
  //   closeModalAndClearForm: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const OrderManagementContext = createContext<ContextType | null>(null);

export const OrderManagementContextProvider = ({
  children,
}: ContextPropsType) => {
  const formControl = useAdminOrderModalFormControl();
  const modalControl = useAdminOrderEditModalControl();

  const value = { modalControl, formControl };

  return (
    <OrderManagementContext value={value}>{children}</OrderManagementContext>
  );
};
