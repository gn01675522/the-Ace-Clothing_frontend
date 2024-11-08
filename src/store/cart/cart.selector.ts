import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../store";

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cart
);

export const selectCartIsLoading = createSelector(
  [selectCartReducer],
  (cart) => cart.isLoading
);

export const selectCartLoadingItems = createSelector(
  [selectCartReducer],
  (cart) => cart.loadingItems
);

export const selectCartModalOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isModalOpen
);

export const selectCartTempData = createSelector(
  [selectCartReducer],
  (cart) => cart.tempData
);

export const selectCartItemsQuantity = createSelector(
  [selectCartItems],
  (cart) => cart.carts.length
);
