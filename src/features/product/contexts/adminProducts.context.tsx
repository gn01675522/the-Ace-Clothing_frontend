import { createContext } from "react";
import { useParams } from "react-router-dom";

import {
  useAdminProductsModalControl,
  useAdminProductModalStateFetch,
  useAdminProductModalFormControl,
} from "../hooks/adminProducts.hooks";

import type { ReactNode } from "react";

type ContextType = {
  formControl: ReturnType<typeof useAdminProductModalFormControl>;
  modalControl: ReturnType<typeof useAdminProductsModalControl>;
  stateFetch: ReturnType<typeof useAdminProductModalStateFetch>;
  pageCategory?: string;
};

export const AdminProductsContext = createContext<ContextType | null>(null);

type PropsType = {
  children: ReactNode;
};

export const AdminProductsContextProvider = ({ children }: PropsType) => {
  const { category } = useParams();

  const modalControl = useAdminProductsModalControl();
  const stateFetch = useAdminProductModalStateFetch(category);
  const formControl = useAdminProductModalFormControl(category);

  const value = {
    formControl,
    modalControl,
    stateFetch,
    pageCategory: category,
  };
  return (
    <AdminProductsContext.Provider value={value}>
      {children}
    </AdminProductsContext.Provider>
  );
};
