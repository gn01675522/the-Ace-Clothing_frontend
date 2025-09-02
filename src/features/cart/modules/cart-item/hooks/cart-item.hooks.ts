import { useContext } from "react";

import { useAppDispatch } from "../../../../../store/redux-hooks";

import { setCartTempData, setCartIsModalOpen } from "../../../store/cart.slice";
import { setUpdateCartItemAsync } from "../../../store/cart.asyncThunk";

import { CartItemContext } from "../contexts/cart-item.contexts";

import { QUANTITY_OPERATION_OPTIONS } from "../../../../../shared/types";

import type { MouseEvent } from "react";
import type { CartItemDto } from "../../../DTOs/cart.dtos";

export const useCartItemContext = () => {
  const context = useContext(CartItemContext);

  if (!context)
    throw new Error(
      "useCartItemContext must be used within CartItemContextProvider"
    );

  return context;
};

export const useCartItemControl = (cartItem: CartItemDto) => {
  const { qty, id } = cartItem;

  const dispatch = useAppDispatch();

  const onClickToChangeCartItems = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (
      (name === QUANTITY_OPERATION_OPTIONS.minus && qty > 1) ||
      name === QUANTITY_OPERATION_OPTIONS.plus
    ) {
      const quantity =
        name === QUANTITY_OPERATION_OPTIONS.plus ? qty + 1 : qty - 1;
      dispatch(setUpdateCartItemAsync({ item: cartItem, quantity }));
    } else {
      dispatch(setCartTempData(id));
      dispatch(setCartIsModalOpen(true));
    }
  };

  return { onClickToChangeCartItems };
};
