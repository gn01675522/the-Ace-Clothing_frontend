import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";

import { fetchUserSingleOrderAsync } from "../store/client/userOrder.asyncThunk";
import {
  selectUserOrderId,
  selectUserOrderProducts,
} from "../store/client/userOrder.selector";
import { selectCartItems } from "../../cart/index";

export const useNavigateWhenCheckoutSuccess = () => {
  const orderId = useAppSelector(selectUserOrderId);

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId !== null) {
      navigate(`/success/${orderId}`);
    }
  }, [orderId, navigate]);
};

export const useFetchStateForCheckout = () => {
  const cartInfo = useAppSelector(selectCartItems);

  const orderProductList = cartInfo.carts.map((cart) => ({
    ...cart.product,
    qty: cart.qty,
    final_total: cart.final_total,
  }));

  return { cartInfo, orderProductList };
};
