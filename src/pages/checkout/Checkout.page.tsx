import {
  OrderCard,
  SummaryCard,
  CheckoutForm,
  useNavigateWhenCheckoutSuccess,
  useFetchStateForCheckout,
} from "../../features/order/index";
import { ToggleList } from "../../components/index";

import type { FC } from "react";

import "./Checkout.styles.scss";

const Checkout: FC = () => {
  useNavigateWhenCheckoutSuccess();
  const { cartInfo, orderProductList } = useFetchStateForCheckout();

  return (
    <div className="checkout">
      <h1 className="checkout__title">付款資訊</h1>
      <CheckoutForm />
      <div className="checkout__info">
        <ToggleList title="訂單內容">
          {orderProductList.map((product) => (
            <OrderCard key={product.id} {...product} />
          ))}
        </ToggleList>
        <SummaryCard final_total={cartInfo.final_total} />
      </div>
    </div>
  );
};

export default Checkout;
