import { useState, useEffect, FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/redux-hooks";

import { ReactComponent as CartLogo } from "../../assets/cart.svg";

import { selectCartItemsQuantity } from "../../store/cart/cart.selector";

import "./CartIcon.styles.scss";

const CartIcon: FC = () => {
  const [isItemChange, setIsItemChange] = useState(false);
  const quantity = useAppSelector(selectCartItemsQuantity);

  const btnClasses = `cart-icon__logo ${
    isItemChange ? "cart-icon__logo--bump" : ""
  }`;

  useEffect(() => {
    if (quantity === 0) {
      return;
    }
    setIsItemChange(true);
    const timer = setTimeout(() => {
      setIsItemChange(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [quantity]);

  return (
    <NavLink className="cart-icon" to="/cart" aria-label="cart link">
      <CartLogo className={btnClasses} />
      {quantity !== 0 && <div className="cart-icon__count">{quantity}</div>}
    </NavLink>
  );
};

export default CartIcon;
