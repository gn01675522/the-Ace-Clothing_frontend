import { useCartStateFetch } from "../../hooks/cart.hooks";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import type { FC } from "react";

export const CartBrief: FC = () => {
  const { cartItems } = useCartStateFetch();
  const { final_total } = cartItems;

  return (
    <div className="cart__info-price">
      <div className="cart__info-price-items">
        <span>小計</span>
        <span>NT$ {formatNumberWithCommas(Math.round(final_total))}</span>
      </div>
      <div className="cart__info-price-items">
        <span>運費</span>
        <span>免費</span>
      </div>
      <div className="cart__info-price-items">
        <span>總計</span>
        <span>NT$ {formatNumberWithCommas(Math.round(final_total))}</span>
      </div>
    </div>
  );
};
