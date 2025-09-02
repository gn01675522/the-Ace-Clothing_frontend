import { createContext } from "react";
import { useAppSelector } from "../../../../../store/redux-hooks";

import { useCartItemControl } from "../hooks/cart-item.hooks";
import { selectCartLoadingItems } from "../../../store/cart.selector";

import type { ReactNode } from "react";
import type { CartItemDto } from "../../../DTOs/cart.dtos";

export type ContextType = {
  cartItemControl: ReturnType<typeof useCartItemControl>;
  cartItem: CartItemDto;
  loadingItems: string[];
};

type ContextPropsType = {
  children: ReactNode;
  cartItem: CartItemDto;
};

export const CartItemContext = createContext<ContextType | null>(null);

export const CartItemContextProvider = ({
  children,
  cartItem,
}: ContextPropsType) => {
  const cartItemControl = useCartItemControl(cartItem);
  const loadingItems = useAppSelector(selectCartLoadingItems);

  const value = { cartItemControl, cartItem, loadingItems };

  return (
    <CartItemContext.Provider value={value}>
      {children}
    </CartItemContext.Provider>
  );
};
