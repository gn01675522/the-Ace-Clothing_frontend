import { NavLink } from "react-router-dom";

import { Message, Loading } from "../../components/index";

import {
  CartItem,
  DeleteInCartModal,
  SetDiscount,
  CartBrief,
  useCartStateFetch,
} from "../../features/cart/index";
import { Categories } from "../../features/navigation/index";

import type { FC } from "react";

import "./Cart.styles.scss";

const Cart: FC = () => {
  const {
    cartItems,
    hasMessage,
    isLoading,
    isDeleteModalOpen,
    onCloseDeleteModal,
  } = useCartStateFetch();

  const { carts } = cartItems;

  const hasItemsInCart = carts?.length > 0;

  const title = hasItemsInCart
    ? `購物車(${carts?.length})`
    : "您的購物車內沒有商品，去購物吧！";

  return (
    <div className="cart">
      {isLoading && <Loading />}
      {hasMessage && <Message />}
      {isDeleteModalOpen && (
        <DeleteInCartModal backdropClose={onCloseDeleteModal} />
      )}
      <div className="cart__content">
        <h1 className="cart__content-title">{title}</h1>

        {carts?.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}

        {!hasItemsInCart && <Categories />}
      </div>
      <div className="cart__info">
        <CartBrief />
        {hasItemsInCart && <SetDiscount />}
        {hasItemsInCart && (
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
  );
};

export default Cart;
