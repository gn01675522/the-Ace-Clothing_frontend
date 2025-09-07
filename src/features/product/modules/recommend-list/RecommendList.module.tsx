import { useAppSelector } from "../../../../store/redux-hooks";

import { ProductCard, selectRecommendProducts } from "../../../product/index";

import type { FC } from "react";

export const RecommendList: FC = () => {
  const recommendProducts = useAppSelector(selectRecommendProducts);

  return (
    <div className="success__recommend">
      <h2 className="success__recommend-title">您或許還想買</h2>
      <div className="success__recommend-card">
        {recommendProducts.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};
