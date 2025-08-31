import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { fetchAdminCouponsAsync } from "../store/admin-coupon.asyncThunk";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
  selectAdminCouponsIsLoading,
} from "../store/admin-coupon.selector";
import { setClearAdminCouponState } from "../store/admin-coupon.slice";

export const useAdminCouponStateFetch = () => {
  const dispatch = useAppDispatch();

  const coupons = useAppSelector(selectAdminCoupons);
  const pagination = useAppSelector(selectAdminCouponsPagination);
  const isLoading = useAppSelector(selectAdminCouponsIsLoading);

  useEffect(() => {
    dispatch(fetchAdminCouponsAsync());
    return () => {
      dispatch(setClearAdminCouponState());
    };
  }, []);

  return { coupons, pagination, isLoading };
};
