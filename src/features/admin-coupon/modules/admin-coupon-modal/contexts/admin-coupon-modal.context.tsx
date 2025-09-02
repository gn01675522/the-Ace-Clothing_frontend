import { createContext } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/redux-hooks";

import { useAdminCouponEditModalFormControl } from "../hooks/admin-coupon-modal.hooks";

import {
  setClearCouponEditModalControl,
  setCouponEditModalIsOpen,
} from "../../../store/admin-coupon.slice";
import {
  selectAdminCouponsEditModalTargetData,
  selectAdminCouponsEditModalType,
} from "../../../store/admin-coupon.selector";

import { defaultCouponFormStructure } from "../config/admin-coupon-modal.config";

import type { ReactNode } from "react";

export type ContextType = {
  formControl: ReturnType<typeof useAdminCouponEditModalFormControl>;
  onCloseHandler: () => void;
  onSubmitHandler: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const CouponManagementContext = createContext<ContextType | null>(null);

export const CouponManagementContextProvider = ({
  children,
}: ContextPropsType) => {
  const targetData = useAppSelector(selectAdminCouponsEditModalTargetData);
  const type = useAppSelector(selectAdminCouponsEditModalType);

  const formControl = useAdminCouponEditModalFormControl({ targetData, type });

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    formControl.setFormData({ id: null, form: defaultCouponFormStructure });
    dispatch(setClearCouponEditModalControl());
    dispatch(setCouponEditModalIsOpen(false));
  };

  const onSubmitHandler = () => {
    formControl.submitForm();
    onCloseHandler();
  };

  const value = { formControl, onCloseHandler, onSubmitHandler };

  return (
    <CouponManagementContext.Provider value={value}>
      {children}
    </CouponManagementContext.Provider>
  );
};
