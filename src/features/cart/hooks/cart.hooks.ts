import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { selectCartItemsQuantity } from "../store/cart.selector";

import { setCartIsModalOpen } from "../store/cart.slice";
import {
  setAddCouponForCartAsync,
  fetchCartItemsAsync,
} from "../store/cart.asyncThunk";
import {
  selectCartItems,
  selectCartModalOpen,
  selectCartIsLoading,
} from "../store/cart.selector";
import { selectHasMessage } from "../../../store/message/message.selector";

import type { ChangeEvent } from "react";

export const useDetectedCartQuantity = () => {
  const [isItemChange, setIsItemChange] = useState(false);

  const quantity = useAppSelector(selectCartItemsQuantity);

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

  return { quantity, isItemChange, setIsItemChange };
};

export const useCartSetCouponControl = () => {
  const [inputValue, setInputValue] = useState("");
  const [applyCoupon, setApplyCoupon] = useState("");

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);

  const addCoupon = async () => {
    await dispatch(setAddCouponForCartAsync(inputValue));
    setApplyCoupon(inputValue);
    await dispatch(fetchCartItemsAsync());
  };

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const couponCode = e.target.value;
    setInputValue(couponCode);
  };

  useEffect(() => {
    if (cartItems?.carts?.[0]?.coupon) {
      setApplyCoupon(cartItems.carts[0].coupon.code);
    } else {
      return;
    }
  }, [cartItems]);

  return {
    inputValue,
    applyCoupon,
    addCoupon,
    onChangeInputValue,
  };
};

export const useCartStateFetch = () => {
  const cartItems = useAppSelector(selectCartItems);
  const isDeleteModalOpen = useAppSelector(selectCartModalOpen);
  const isLoading = useAppSelector(selectCartIsLoading);
  const hasMessage = useAppSelector(selectHasMessage);

  const dispatch = useAppDispatch();

  const onCloseDeleteModal = () => dispatch(setCartIsModalOpen(false));

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, []);

  return {
    cartItems,
    isDeleteModalOpen,
    isLoading,
    hasMessage,
    onCloseDeleteModal,
  };
};
