import { CartItemContextProvider } from "./contexts/cart-item.contexts";

import { CartItemImg } from "./components/cart-item-img/CartItemImg.component";
import { CartItemFooter } from "./components/cart-item-footer/CartItemFooter.component";
import { CartItemDetail } from "./components/cart-item-detail/CartItemDetail.component";
import { CartItemHeader } from "./components/cart-item-header/CartItemHeader.component";

import type { FC } from "react";
import type { CartItemDto } from "../../DTOs/cart.dtos";

import "./CartItem.styles.scss";

const CartItemContent: FC = () => {
  return (
    <div className="cart-item">
      <CartItemImg />
      <div className="cart-item__right">
        <CartItemHeader />
        <CartItemDetail />
        <CartItemFooter />
      </div>
    </div>
  );
};

type PropsType = {
  cartItem: CartItemDto;
};

export const CartItem: FC<PropsType> = ({ cartItem }) => {
  return (
    <CartItemContextProvider cartItem={cartItem}>
      <CartItemContent />
    </CartItemContextProvider>
  );
};
