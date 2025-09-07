import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";

import { setClearUserOrderState } from "../store/client/userOrder.slice";
import { fetchUserSingleOrderAsync } from "../store/client/userOrder.asyncThunk";
import {
  selectUserOrderId,
  selectUserOrderProducts,
  selectUserOrderTotalPrice,
  selectUserSingleOrder,
} from "../store/client/userOrder.selector";

import { fetchCartItemsAsync, selectCartItems } from "../../cart/index";
import { fetchUserProductAsync, clearUserProduct } from "../../product/index";

import { selectUserFavorite } from "../../user/index";

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

export const useFetchStateForCheckoutSuccess = () => {
  const { orderId } = useParams();
  const totalPrice = useAppSelector(selectUserOrderTotalPrice);
  const userData = useAppSelector(selectUserSingleOrder);
  const wishlist = useAppSelector(selectUserFavorite);

  const dispatch = useAppDispatch();

  const productList = Object.values(userData?.products || {}).map((item) => ({
    id: item.product.id,
    imageUrl: item.product.imageUrl,
    title: item.product.title,
    qty: item.qty,
    final_total: item.final_total,
  }));

  useEffect(() => {
    if (orderId) dispatch(fetchUserSingleOrderAsync(orderId));
    dispatch(fetchCartItemsAsync());
    dispatch(fetchUserProductAsync());

    return () => {
      dispatch(clearUserProduct());
      dispatch(setClearUserOrderState());
    };
  }, [orderId]);

  useEffect(() => {
    //* selector 變動時則將 wishlist 內容放入 localStorage 裡面
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return { totalPrice, userData, productList };
};
