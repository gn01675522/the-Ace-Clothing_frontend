import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../../../store/store";

const selectUserOrderReducer = (state: RootState) => state.userOrder;

export const selectUserSingleOrder = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.orderData
);

export const selectUserOrders = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.orders
);

export const selectUserOrderIsLoading = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.isLoading
);

export const selectUserOrderId = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.orderId
);

export const selectUserOrderProducts = createSelector(
  [selectUserSingleOrder],
  (orderData) => {
    if (orderData?.products) return Object.values(orderData?.products);
    else return [];
  }
);

export const selectUserOrderTotalPrice = createSelector(
  [selectUserOrderProducts],
  (orderData) => {
    if (orderData)
      return orderData.reduce(
        (total, productPrice) => total + productPrice.final_total,
        0
      );
    return null;
  }
);
