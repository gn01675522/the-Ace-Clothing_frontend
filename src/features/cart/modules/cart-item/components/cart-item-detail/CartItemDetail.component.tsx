import { useCartItemContext } from "../../hooks/cart-item.hooks";

import { formatNumberWithCommas } from "../../../../../../utils/common.utils";

import type { FC } from "react";

export const CartItemDetail: FC = () => {
  const {
    cartItemControl: { onClickToChangeCartItems },
    cartItem: { final_total },
  } = useCartItemContext();

  return (
    <div className="cart-item__right-body">
      <div className="cart-item__right-body-content">
        <span className="cart-item__right-body-content-item">Color： 預設</span>
      </div>
      <div className="cart-item__right-body-content">
        <span className="cart-item__right-body-content-item">Size： 預設</span>
      </div>
      <div className="cart-item__right-body-content">
        <button
          type="button"
          name="delete"
          className="cart-item__right-body-content-remove"
          onClick={onClickToChangeCartItems}
        >
          刪除
        </button>
        <div className="cart-item__right-body-content-count">
          <span>總金額</span>
          <span>NT$ {formatNumberWithCommas(Math.round(final_total))}</span>
        </div>
      </div>
    </div>
  );
};
