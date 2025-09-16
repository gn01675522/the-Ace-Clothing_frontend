import { ProductInfoSectionContextProvider } from "./contexts/product-info-section.contexts";

import { ProductInfoSectionHeader } from "./components/product-info-section-header/ProductInfoSectionHeader.component";
import { ProductInfoSectionBody } from "./components/product-info-section-body/ProductInfoSectionBody.component";
import { ProductInfoSectionFooter } from "./components/product-info-section-footer/ProductInfoSectionFooter.component";

import type { FC } from "react";

import "./ProductInfoSection.styles.scss";

const ProductInfoSectionContent: FC = () => {
  return (
    <section className="product-detail__sale-info">
      <ProductInfoSectionHeader />
      <ProductInfoSectionBody />
      <ProductInfoSectionFooter />
    </section>
  );
};

type PropsType = {
  targetId?: string;
};

export const ProductInfoSection: FC<PropsType> = ({ targetId }) => {
  return (
    <ProductInfoSectionContextProvider targetId={targetId}>
      <ProductInfoSectionContent />
    </ProductInfoSectionContextProvider>
  );
};
