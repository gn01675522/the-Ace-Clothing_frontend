import { useAppSelector } from "../../store/redux-hooks";
import { NavLink } from "react-router-dom";

import { CartItem, CartOverlay } from "../../features/cart/index";
import { Categories } from "../../features/navigation/index";

import {
  SetDiscount,
  CartBrief,
  useCartStateFetch,
} from "../../features/cart/index";
import { selectHasMessage } from "../../store/message/message.selector";

import type { FC } from "react";

import "./Cart.styles.scss";

const Cart: FC = () => {
  const { cartItems } = useCartStateFetch();

  const hasMessage = useAppSelector(selectHasMessage);

  const { carts } = cartItems;

  return (
    <>
      <CartOverlay hasMessage={hasMessage} />
      <div className="cart">
        <div className="cart__content">
          <h1 className="cart__content-title">
            {carts?.length > 0
              ? `購物車(${carts?.length})`
              : "您的購物車內沒有商品，去購物吧！"}
          </h1>
          {carts?.length > 0 &&
            carts?.map((item) => <CartItem item={item} key={item.id} />)}
          {carts?.length === 0 && <Categories />}
        </div>
        <div className="cart__info">
          <CartBrief />
          {carts?.length > 0 && <SetDiscount />}
          {carts?.length > 0 && (
            <div className="cart__info-checkout">
              <NavLink to="/checkout" className="cart__info-checkout-link">
                前往付款
              </NavLink>
              <NavLink to="/" className="cart__info-checkout-go-shop">
                繼續購物
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
