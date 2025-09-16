import type { UserProductsDto } from "../../../DTOs/userProduct.dtos";

export const productInfoSectionHeaderConfig = (
  productDetail: UserProductsDto | null
) => ({
  isOnSale: productDetail
    ? productDetail.origin_price > productDetail.price
    : false,
  discountPercent: productDetail
    ? Math.trunc((1 - productDetail.price / productDetail.origin_price) * 100)
    : 0,
});

export const productInfoSectionBodyConfig = (
  productDetail: UserProductsDto | null
) => ({
  productIntroContentText: productDetail ? productDetail?.content : "",
  productMaterialTextArray: productDetail
    ? productDetail.description.split("-").map((item) => item)
    : [],
});

export const productInfoSectionFooterConfig = (
  itemQuantity: number,
  qty: number,
  remainingQuantity: number
) => ({
  alertText:
    itemQuantity === 5
      ? "* 購買上限為 5 件"
      : `* 購物車內已有${qty}件，上限為 5 件`,
  addCartButtonText: remainingQuantity < 0 ? "已達購買上限" : "加入購物車",
});
