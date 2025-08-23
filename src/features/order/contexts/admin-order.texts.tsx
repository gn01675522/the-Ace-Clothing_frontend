import { createContext } from "react";

import type { ReactNode } from "react";

export const AdminOrderContext = createContext<{} | null>(null);

type ContextPropsType = {
  children: ReactNode;
};

export const AdminOrderContextProvider = ({ children }: ContextPropsType) => {
  const value = {};
  return (
    <AdminOrderContext.Provider value={value}>
      {children}
    </AdminOrderContext.Provider>
  );
};
