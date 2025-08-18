import { NavLink } from "react-router-dom";

import { useDetectedCartQuantity } from "../../hooks/cart.hooks";

import { CartSVGIcon } from "../../../../components/index";

import type { FC } from "react";

import "./CartIcon.styles.scss";

type PropsType = {
  wrapperClass?: string;
  iconClass?: string;
  quantityClass?: string;
};

export const CartIcon: FC<PropsType> = ({
  wrapperClass,
  iconClass,
  quantityClass,
}) => {
  const { quantity, isItemChange } = useDetectedCartQuantity();

  const wrapperClasses = `cart-icon ${wrapperClass ? wrapperClass : ""}`;

  const iconClasses = `cart-icon__logo ${
    isItemChange ? "cart-icon__logo--bump" : ""
  } ${iconClass ? iconClass : ""}`;

  const quantityClasses = `cart-icon__count ${
    quantityClass ? quantityClass : ""
  }`;

  return (
    <NavLink className={wrapperClasses} to="/cart" aria-label="cart link">
      <CartSVGIcon className={iconClasses} />
      {quantity !== 0 && <div className={quantityClasses}>{quantity}</div>}
    </NavLink>
  );
};
