import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import {
  fetchAdminCouponsAsync,
  deleteAdminCouponsAsync,
} from "../store/admin-coupon.asyncThunk";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
  selectAdminCouponsIsLoading,
  selectAdminCouponsEditModalIsOpen,
} from "../store/admin-coupon.selector";
import { setClearAdminCouponState } from "../store/admin-coupon.slice";

export const useAdminCouponStateFetch = () => {
  const dispatch = useAppDispatch();

  const coupons = useAppSelector(selectAdminCoupons);
  const pagination = useAppSelector(selectAdminCouponsPagination);
  const isLoading = useAppSelector(selectAdminCouponsIsLoading);
  const isEditCouponModalOpen = useAppSelector(
    selectAdminCouponsEditModalIsOpen
  );

  useEffect(() => {
    dispatch(fetchAdminCouponsAsync());
    return () => {
      dispatch(setClearAdminCouponState());
    };
  }, []);

  return { coupons, pagination, isLoading, isEditCouponModalOpen };
};

export const useAdminCouponActionControl = () => {
  const dispatch = useAppDispatch();

  const deleteCouponAction = (id: string) =>
    dispatch(deleteAdminCouponsAsync(id));

  return { deleteCouponAction };
};
