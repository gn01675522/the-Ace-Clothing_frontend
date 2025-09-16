import { useAppSelector } from "../../../../store/redux-hooks";

import { ProductCard, selectRecommendProducts } from "../../../product/index";

import type { FC } from "react";

import "./RecommendList.styles.scss";

export const RecommendList: FC = () => {
  const recommendProducts = useAppSelector(selectRecommendProducts);

  return (
    <div className="recommend-list">
      <h2 className="recommend-list__title">您或許還想買</h2>
      <div className="recommend-list__card">
        {recommendProducts.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};
