import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

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

export const selectAdminOrdersIsModalOpen = createSelector(
  [selectAdminOrdersReducer],
  (adminOrder) => adminOrder.isModalOpen
);

export const selectAdminOrdersTempData = createSelector(
  [selectAdminOrdersReducer],
  (adminOrder) => adminOrder.tempData
);
