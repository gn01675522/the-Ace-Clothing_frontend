import { PriceTag } from "../../../../../../components/index";

import { useProductInfoSectionContext } from "../../hooks/product-info-section.hooks";

import { productInfoSectionHeaderConfig } from "../../config/product-info-section.config";

import { sharedText } from "../../../../../../shared/texts/texts.shared";

import type { FC } from "react";

import "./ProductInfoSectionHeader.styles.scss";

export const ProductInfoSectionHeader: FC = () => {
  const {
    stateFetch: { productDetail },
  } = useProductInfoSectionContext();

  const { isOnSale, discountPercent } =
    productInfoSectionHeaderConfig(productDetail);

  return (
    <div className="product-info-section-header">
      <div className="product-info-section-header__wrapper">
        <h3 className="product-info-section-header__subtitle">
          {sharedText.brandName}
        </h3>
        <h1 className="product-info-section-header__title">
          {productDetail?.title}
        </h1>
      </div>
      <div className="product-info-section-header__price">
        {isOnSale && (
          <p className="product-info-section-header__price-percent">
            {discountPercent + "% off"}
          </p>
        )}
        <div className="product-info-section-header__price-tag">
          <PriceTag
            origin_price={productDetail?.origin_price || 0}
            price={productDetail?.price || 0}
          />
        </div>
      </div>
    </div>
  );
};
