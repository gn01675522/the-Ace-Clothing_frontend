import { Message } from "../../components/index";

import {
  ScrollImg,
  ProductInfoSection,
  useProductDetailPageStateFetch,
} from "../../features/product/index";

import type { FC } from "react";

import "./ProductDetail.styles.scss";

const ProductDetail: FC = () => {
  const { id, hasMessage, product } = useProductDetailPageStateFetch();

  return (
    <div className="product-detail">
      {hasMessage && <Message />}
      <div className="product-detail__sale">
        <ScrollImg targetProduct={product} />
        <ProductInfoSection targetId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;
