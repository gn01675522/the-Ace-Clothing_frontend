import { createContext } from "react";

import {
  useAdminOrderModalControl,
  useAdminOrderStateFetch,
  useAdminOrderModalFormControl,
} from "../hooks/admin-order.hooks";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminOrderModalControl>;
  stateFetch: ReturnType<typeof useAdminOrderStateFetch>;
  formControl: ReturnType<typeof useAdminOrderModalFormControl>;
};

export const AdminOrderContext = createContext<ContextType | null>(null);

type ContextPropsType = {
  children: ReactNode;
};

export const AdminOrderContextProvider = ({ children }: ContextPropsType) => {
  const modalControl = useAdminOrderModalControl();
  const stateFetch = useAdminOrderStateFetch();
  const formControl = useAdminOrderModalFormControl();

  const value = {
    modalControl,
    stateFetch,
    formControl,
  };
  return (
    <AdminOrderContext.Provider value={value}>
      {children}
    </AdminOrderContext.Provider>
  );
};
