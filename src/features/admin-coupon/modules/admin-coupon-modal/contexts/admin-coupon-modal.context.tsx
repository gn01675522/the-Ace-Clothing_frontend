import { createContext } from "react";
import { useAppDispatch } from "../../../../../store/redux-hooks";

import {
  useAdminCouponEditModalControl,
  useAdminCouponEditModalFormControl,
} from "../hooks/admin-coupon-modal.hooks";

import { setClearCouponEditModalControl } from "../../../store/adminCoupon.slice";

import { defaultCouponCreateData } from "../../../config/admin-coupon.config";

import type { ReactNode } from "react";

type ContextType = {
  modalControl: ReturnType<typeof useAdminCouponEditModalControl>;
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
  const modalControl = useAdminCouponEditModalControl();

  const dispatch = useAppDispatch();

  const closeModalAndClearForm = () => {
    modalControl.switchModalOpen();
    formControl.setFormData({ id: null, form: defaultCouponCreateData });
    dispatch(setClearCouponEditModalControl());
  };

  const value = { formControl, modalControl, closeModalAndClearForm };

  return (
    <CouponManagementContext.Provider value={value}>
      {children}
    </CouponManagementContext.Provider>
  );
};
