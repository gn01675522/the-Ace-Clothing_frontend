import { Pagination } from "../../../../components/index";
import { ProductCard } from "../../components/product-card/ProductCard.component";

import {
  useProductPreviewListStateFetch,
  useChangePagination,
} from "./hooks/product-preview-list.hooks";
import { useToScrollToTop } from "../../../../shared/hooks/shared.hooks";

import { PRODUCT_CATEGORIES } from "../../../../shared/types";

import type { FC } from "react";

import "./ProductPreviewList.styles.scss";

export const ProductPreviewList: FC = () => {
  const { category, products } = useProductPreviewListStateFetch();
  const { currentPage, onChangePage, pageCount, productsPerPage } =
    useChangePagination(products, category as PRODUCT_CATEGORIES);

  useToScrollToTop({ dependencies: [currentPage] });

  return (
    <>
      <div className="products-preview-list">
        {productsPerPage.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <nav className="products-preview-list__pagination">
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          pageCount={pageCount}
        />
      </nav>
    </>
  );
};
