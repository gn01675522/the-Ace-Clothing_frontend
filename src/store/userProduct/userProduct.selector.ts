import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectUserProductReducer = (state: RootState) => state.userProduct;

export const selectUserProducts = createSelector(
  [selectUserProductReducer],
  (userProduct) =>
    [...userProduct.products].sort((a, b) =>
      a.category.localeCompare(b.category)
    )
);
//* 取出全部產品資料

export const selectUserSingleProduct = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.product
);
//*取出單筆產品資料 (已於 action 處透過 id 來向 api 索取)

export const selectUserProductIsLoading = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.isLoading
);
//* 與 api 交互時的 loading 狀態

const classifyUserProducts = (category) =>
  createSelector([selectUserProducts], (products) =>
    products.filter((product) => product.category.split("-")[0] === category)
  );
//* 針對 api 產品資料裡 category 來做出拆分的工廠函式

const classifyProductsStyle = (style) =>
  createSelector([selectUserProducts], (products) =>
    products.filter((product) => product.title.split(" ")[0] === style)
  );
//* 針對 api 產品資料裡在名稱前面有設定風格類別的產品進行拆分

//* ****************************** 以下為業務邏輯 ********************************* */
export const selectUserMensProducts = classifyUserProducts("mens");
//* 將產品列表裡面的男性商品取出

export const selectUserWomensProducts = classifyUserProducts("womens");
//* 將產品列表裡面的女性商品取出

export const selectUserHatsProducts = classifyUserProducts("hats");

export const selectUserShoesProducts = classifyUserProducts("shoes");
//* 將產品列表裡面的帽子商品取出

export const selectUserAccessoriesProducts =
  classifyUserProducts("accessories");
//* 將產品列表裡面的飾品商品取出

export const selectUrbanProducts = classifyProductsStyle("Urban");
//* 將產品列表裡面有 Urban 的產品取出

export const selectBohemianProducts = classifyProductsStyle("Bohemian");
//* 將產品列表裡面有 Bohemian 的產品取出

export const selectUserProductsOnSale = createSelector(
  [selectUserProducts],
  (products) =>
    products.filter((product) => product.origin_price > product.price)
);
//* 取出原價比售價還高的產品

export const selectNewUserProducts = createSelector(
  [selectUserProducts],
  (products) => {
    const randomNumber = Math.floor(Math.random() * (products.length - 21));
    return products.slice(randomNumber, randomNumber + 20);
  }
);
//* 由於 api 沒有創建時間，故使用隨機 20 個產品的方式來呈現新到貨的業務邏輯

export const selectRecommendProducts = createSelector(
  [selectUserProducts],
  (products) => {
    const randomNumber = Math.floor(Math.random() * (products.length - 4));
    return products.slice(randomNumber, randomNumber + 4);
  }
);
//* 於付款成功後，隨機推薦 4 個商品在頁面上
