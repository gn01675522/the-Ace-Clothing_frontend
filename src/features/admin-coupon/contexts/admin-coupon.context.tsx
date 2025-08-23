import { createContext } from "react";

import {
  useAdminCouponModalControl,
  useAdminCouponStateFetch,
  useAdminCouponFormControl,
} from "../hooks/admin-coupon.hooks";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminCouponModalControl>;
  formControl: ReturnType<typeof useAdminCouponFormControl>;
  stateFetch: ReturnType<typeof useAdminCouponStateFetch>;
};

type ContextPropsType = {
  children: ReactNode;
};

export const AdminCouponContext = createContext<ContextType | null>(null);

export const AdminCouponContextProvider = ({ children }: ContextPropsType) => {
  const modalControl = useAdminCouponModalControl();
  const stateFetch = useAdminCouponStateFetch();
  const formControl = useAdminCouponFormControl();

  const value = {
    modalControl,
    stateFetch,
    formControl,
  };

  return (
    <AdminCouponContext.Provider value={value}>
      {children}
    </AdminCouponContext.Provider>
  );
};
