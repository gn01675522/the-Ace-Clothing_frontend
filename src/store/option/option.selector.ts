import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectOptionReducer = (state: RootState) => state.option;
//* 選取 rootReducer 上的 message reducer

export const selectOptionProductCategories = createSelector(
  [selectOptionReducer],
  (option) =>
    option.productCategories.map((category) => ({
      id: category._id,
      name: category.name,
    }))
);

export const selectOptionProductCategoryTree = createSelector(
  [selectOptionReducer],
  (option) => option.productCateogryTree
);

export const selectOptionGenders = createSelector(
  [selectOptionReducer],
  (option) =>
    option.genders.map((gender) => ({ id: gender._id, name: gender.name }))
);

export const selectOptionIsLoading = createSelector(
  [selectOptionReducer],
  (option) => option.isLoading
);
