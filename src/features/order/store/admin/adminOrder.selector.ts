import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../../store/store";

const selectAdminOrdersReducer = (state: RootState) => state.adminOrder;

export const selectAdminOrders = createSelector(
  [selectAdminOrdersReducer],
  (adminOrder) => adminOrder.orders
);

export const selectAdminOrdersPagination = createSelector(
  [selectAdminOrdersReducer],
  (adminOrder) => adminOrder.pagination
);

export const selectAdminOrdersIsLoading = createSelector(
  [selectAdminOrdersReducer],
  (adminOrder) => adminOrder.isLoading
);

export const selectAdminOrderEditModalControl = createSelector(
  [selectAdminOrdersReducer],
  (adminCoupon) => adminCoupon.orderEditModalControl
);

export const selectAdminOrderEditModalIsOpen = createSelector(
  [selectAdminOrderEditModalControl],
  (modalControl) => modalControl.isOpen
);

export const selectAdminOrderEditModalTargetData = createSelector(
  [selectAdminOrderEditModalControl],
  (modalControl) => modalControl.targetData
);
