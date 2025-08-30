import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";

import { fetchAdminCouponsAsync } from "../store/adminCoupon.asyncThunk";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
  selectAdminCouponsIsLoading,
} from "../store/adminCoupon.selector";
import { setClearAdminCouponState } from "../store/adminCoupon.slice";

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
