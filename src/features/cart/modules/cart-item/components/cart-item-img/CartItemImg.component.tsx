import { useCartItemContext } from "../../hooks/cart-item.hooks";

import type { FC } from "react";

export const CartItemImg: FC = () => {
  const {
    cartItem: {
      product: { title, imageUrl },
    },
  } = useCartItemContext();

  return (
    <div className="cart-item__left">
      <img
        src={imageUrl}
        className="cart-item__left-img"
        alt={`product in cart: ${title}`}
      />
    </div>
  );
};
