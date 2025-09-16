import {
  selectUserProducts,
  selectUserMensProducts,
  selectUserWomensProducts,
  selectUserHatsProducts,
  selectUserShoesProducts,
  selectUserAccessoriesProducts,
  selectUrbanProducts,
  selectBohemianProducts,
} from "../store/client/userProduct.selector";

import { PRODUCT_CATEGORIES } from "../../../shared/types";

//* 根據傳入 category 來決定 return 哪個 selector
export const getClientProductsByCategory = (category: PRODUCT_CATEGORIES) =>
  ({
    [PRODUCT_CATEGORIES.all]: selectUserProducts,
    [PRODUCT_CATEGORIES.mens]: selectUserMensProducts,
    [PRODUCT_CATEGORIES.womens]: selectUserWomensProducts,
    [PRODUCT_CATEGORIES.hats]: selectUserHatsProducts,
    [PRODUCT_CATEGORIES.shoes]: selectUserShoesProducts,
    [PRODUCT_CATEGORIES.accessories]: selectUserAccessoriesProducts,
    [PRODUCT_CATEGORIES.urban]: selectUrbanProducts,
    [PRODUCT_CATEGORIES.bohemian]: selectBohemianProducts,
  }[category]);
