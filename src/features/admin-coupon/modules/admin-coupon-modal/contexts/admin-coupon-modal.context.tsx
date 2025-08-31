import { createContext } from "react";
import { useAppDispatch } from "../../../../../store/redux-hooks";

import { useAdminCouponEditModalFormControl } from "../hooks/admin-coupon-modal.hooks";

import {
  setClearCouponEditModalControl,
  setCouponEditModalIsOpen,
} from "../../../store/admin-coupon.slice";

import { defaultCouponFormStructure } from "../config/admin-coupon-modal.config";

import type { ReactNode } from "react";

type ContextType = {
  formControl: ReturnType<typeof useAdminCouponEditModalFormControl>;
  closeModalAndClearForm: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const CouponManagementContext = createContext<ContextType | null>(null);

export const CouponManagementContextProvider = ({
  children,
}: ContextPropsType) => {
  const formControl = useAdminCouponEditModalFormControl();

  const dispatch = useAppDispatch();

  const closeModalAndClearForm = () => {
    formControl.setFormData({ id: null, form: defaultCouponFormStructure });
    dispatch(setClearCouponEditModalControl());
    dispatch(setCouponEditModalIsOpen(false));
  };

  const value = { formControl, closeModalAndClearForm };

  return (
    <CouponManagementContext.Provider value={value}>
      {children}
    </CouponManagementContext.Provider>
  );
};
