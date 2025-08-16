import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";

const selectAdminCouponsReducer = (state: RootState) => state.adminCoupon;

export const selectAdminCoupons = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupon) => adminCoupon.coupons
);

export const selectAdminCouponsPagination = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupon) => adminCoupon.pagination
);

export const selectAdminCouponsIsLoading = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupon) => adminCoupon.isLoading
);

export const selectAdminCouponsTempData = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupon) => adminCoupon.tempData
);
