import { NavLink } from "react-router-dom";

import { useCartDetectedQuantity } from "../../hooks/cart.hooks";

import CartSVGIcon from "../../../../components/SVGIcons/CartSVGIcon.component";

import type { FC } from "react";

import "./CartIcon.styles.scss";

const CartIcon: FC = () => {
  const { quantity, isItemChange } = useCartDetectedQuantity();

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

export default CartIcon;
