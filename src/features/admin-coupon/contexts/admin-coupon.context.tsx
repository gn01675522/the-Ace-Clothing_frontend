import { createContext } from "react";

import {
  useAdminCouponModalControl,
  useAdminCouponStateFetch,
  useAdminCouponFormControl,
} from "../hooks/admin-coupon.hooks";

import { defaultCreateData } from "../hooks/admin-coupon.hooks";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminCouponModalControl>;
  formControl: ReturnType<typeof useAdminCouponFormControl>;
  stateFetch: ReturnType<typeof useAdminCouponStateFetch>;
  closeModalAndClearForm: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const AdminCouponContext = createContext<ContextType | null>(null);

export const AdminCouponContextProvider = ({ children }: ContextPropsType) => {
  const modalControl = useAdminCouponModalControl();
  const stateFetch = useAdminCouponStateFetch();
  const formControl = useAdminCouponFormControl();

  const closeModalAndClearForm = () => {
    modalControl.setIsModalOpen(false);
    formControl.setFormData({ id: null, form: defaultCreateData });
    formControl.setTargetData(null);
  };

  const value = {
    modalControl,
    stateFetch,
    formControl,
    closeModalAndClearForm,
  };

  return (
    <AdminCouponContext.Provider value={value}>
      {children}
    </AdminCouponContext.Provider>
  );
};
