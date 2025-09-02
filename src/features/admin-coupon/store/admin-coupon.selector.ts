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

export const selectAdminCouponsEditModalControl = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupon) => adminCoupon.couponEditModalControl
);

export const selectAdminCouponsEditModalIsOpen = createSelector(
  [selectAdminCouponsEditModalControl],
  (modalControl) => modalControl.isOpen
);

export const selectAdminCouponsEditModalType = createSelector(
  [selectAdminCouponsEditModalControl],
  (modalControl) => modalControl.type
);

export const selectAdminCouponsEditModalTargetData = createSelector(
  [selectAdminCouponsEditModalControl],
  (modalControl) => modalControl.targetData
);
