import { useProductInfoSectionContext } from "../../hooks/product-info-section.hooks";

import { productInfoSectionBodyConfig } from "../../config/product-info-section.config";

import type { FC } from "react";

import "./ProductInfoSectionBody.styles.scss";

export const ProductInfoSectionBody: FC = () => {
  const {
    stateFetch: { productDetail },
  } = useProductInfoSectionContext();

  const { productIntroContentText, productMaterialTextArray } =
    productInfoSectionBodyConfig(productDetail);

  return (
    <div className="product-info-section-body">
      <div className="product-info-section-body__content">
        {productIntroContentText}
      </div>
      <div className="product-info-section-body__material">
        <div className="product-info-section-body__material-header">
          <h2 className="product-info-section-body__material-header-title">
            詳細資料
          </h2>
        </div>
        <ul className="product-info-section-body__info">
          {productMaterialTextArray.map((item: string) => (
            <li key={item} className="product-info-section-body__info-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
