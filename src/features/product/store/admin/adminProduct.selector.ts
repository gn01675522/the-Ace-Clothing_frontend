import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../../store/store";

const selectAdminProductReducer = (state: RootState) => state.adminProduct;

//* 取出完整產品資料，並做初步排序
export const selectAdminProducts = createSelector(
  [selectAdminProductReducer],
  (adminProduct) =>
    Object.values(adminProduct.products).sort((a, b) =>
      a.category.localeCompare(b.category)
    )
);

//* 取出讀取狀態
export const selectAdminProductIsLoading = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.isLoading
);

//* 取出 error 訊息
export const selectAdminProductError = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.error
);

//* 將全部的產品依據傳入值分類
const classifyAdminProducts = (category: string) =>
  createSelector([selectAdminProducts], (products) =>
    products.filter((product) => product.category.split("-")[0] === category)
  );

//* ****************************** 以下為業務邏輯 ********************************* */
//* 就取出的完整產品資料將 mens 分類出來
export const selectAdminMensProducts = classifyAdminProducts("mens");

//* 就取出的完整產品資料將 womens 分類出來
export const selectAdminWomensProducts = classifyAdminProducts("womens");

//* 就取出的完整產品資料將 hats 分類出來
export const selectAdminHatsProducts = classifyAdminProducts("hats");

//* 就取出的完整產品資料將 shoes 分類出來
export const selectAdminShoesProducts = classifyAdminProducts("shoes");

//* 就取出的完整產品資料將 accessories 分類出來
export const selectAdminAccessoriesProducts =
  classifyAdminProducts("accessories");
