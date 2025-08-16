import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/redux-hooks";
import { selectCartItemsQuantity } from "../store/cart.selector";

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
