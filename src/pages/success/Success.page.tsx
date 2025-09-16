import { Link } from "react-router-dom";

import { ToggleList } from "../../components/index";

import {
  useFetchStateForCheckoutSuccess,
  OrderCard,
  SummaryCard,
} from "../../features/order/index";

import { RecommendList } from "../../features/product/index";

import type { FC } from "react";

import "./Success.styles.scss";

const Success: FC = () => {
  const { userData, totalPrice, productList } =
    useFetchStateForCheckoutSuccess();

  return (
    <div className="success">
      <div className="success__order-detail">
        <h1 className="success__order-detail-title">訂購完成</h1>
        <SummaryCard final_total={totalPrice!} userData={userData!} />
        <div className="success__actions">
          <Link to="/" className="success__actions-home">
            返回首頁
          </Link>
        </div>
        <ToggleList title="訂單內容">
          {productList.map((product) => (
            <OrderCard key={product.id} {...product} />
          ))}
        </ToggleList>
      </div>
      <RecommendList />
    </div>
  );
};

export default Success;
