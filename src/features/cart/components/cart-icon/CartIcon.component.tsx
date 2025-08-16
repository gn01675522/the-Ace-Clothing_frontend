import { NavLink } from "react-router-dom";

import { useDetectedCartQuantity } from "../../hooks/cart.hooks";

import { CartSVGIcon } from "../../../../components/index";

import type { FC } from "react";

import "./CartIcon.styles.scss";

export const CartIcon: FC = () => {
  const { quantity, isItemChange } = useDetectedCartQuantity();

  const btnClasses = `cart-icon__logo ${
    isItemChange ? "cart-icon__logo--bump" : ""
  }`;

  return (
    <NavLink className="cart-icon" to="/cart" aria-label="cart link">
      <CartSVGIcon className={btnClasses} />
      {quantity !== 0 && <div className="cart-icon__count">{quantity}</div>}
    </NavLink>
  );
};
