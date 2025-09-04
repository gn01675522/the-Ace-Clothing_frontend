import { useCartStateFetch } from "../../hooks/cart.hooks";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import type { FC } from "react";

import "./CartBrief.styles.scss";

export const CartBrief: FC = () => {
  const { cartItems } = useCartStateFetch();
  const { final_total } = cartItems;

  return (
    <div className="cart-brief">
      <div className="cart-brief__item">
        <span>小計</span>
        <span>NT$ {formatNumberWithCommas(Math.round(final_total))}</span>
      </div>
      <div className="cart-brief__item">
        <span>運費</span>
        <span>免費</span>
      </div>
      <div className="cart-brief__item">
        <span>總計</span>
        <span>NT$ {formatNumberWithCommas(Math.round(final_total))}</span>
      </div>
    </div>
  );
};
