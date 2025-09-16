import { Loading, Message } from "../../components/index";
import {
  ProductPreviewList,
  useProductPageStateFetch,
} from "../../features/product/index";

import { productCartegoryEnToCHMapping } from "../../shared/texts/mapping.shared";

import { PRODUCT_CATEGORIES } from "../../shared/types";

import type { FC } from "react";

import "./Products.styles.scss";

const Products: FC = () => {
  const { category, hasMessage, isLoading } = useProductPageStateFetch();

  const pageTitle =
    productCartegoryEnToCHMapping[category as PRODUCT_CATEGORIES];

  return (
    <div className="products">
      {hasMessage && <Message />}
      {isLoading && <Loading />}
      <h1 className="products__title">{pageTitle}</h1>
      <ProductPreviewList />
    </div>
  );
};

export default Products;
