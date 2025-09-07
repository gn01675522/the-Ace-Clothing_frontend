import { useState, useEffect, useContext } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/redux-hooks";

import { ProductInfoSectionContext } from "../contexts/product-info-section.contexts";

import {
  fetchCartItemsAsync,
  selectCartIsLoading,
  selectCartItemById,
  setAddItemToCartAsync,
  CartItemDto,
} from "../../../../cart/index";
import { selectUserFavorite, setUserFavorite } from "../../../../user/index";
import { fetchUserSingleProductAsync } from "../../../store/client/userProduct.asyncThunk";
import { selectUserSingleProduct } from "../../../store/client/userProduct.selector";

import type { MouseEvent } from "react";

export const useProductInfoSectionContext = () => {
  const context = useContext(ProductInfoSectionContext);

  if (!context)
    throw new Error(
      "useProductInfoSectionContext must be used within ProductInfoSectionContextProvider"
    );

  return context;
};

export const useProductInfoSectionStateFetch = (targetId?: string) => {
  const productDetail = useAppSelector(selectUserSingleProduct);
  const sameProductInCart = useAppSelector(selectCartItemById(targetId || ""));
  const isCartLoading = useAppSelector(selectCartIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, []);

  useEffect(() => {
    if (targetId) {
      dispatch(fetchUserSingleProductAsync(targetId));
    }
  }, [targetId]);

  return {
    isCartLoading,
    productDetail,
    sameProductInCart,
  };
};

export const useChangeQuantityControl = (targetData?: CartItemDto) => {
  const [itemQuantity, setItemQuantity] = useState(1);

  //* 根據 productInCart 的數量來進行顧客購買最大數量的設定
  const remainingQuantity = 5 - itemQuantity - (targetData?.qty || 0);

  const onChangeQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === "add" && remainingQuantity > 0) {
      setItemQuantity((prev) => prev + 1);
    } else if (name === "minor") {
      setItemQuantity((prev) => prev - 1);
    }
  };

  return { itemQuantity, onChangeQuantity, remainingQuantity };
};

type UseActionControlPropsType = {
  itemQuantity: number;
  targetId?: string;
};

export const useActionControl = ({
  itemQuantity,
  targetId = "",
}: UseActionControlPropsType) => {
  const wishlist = useAppSelector(selectUserFavorite);

  const dispatch = useAppDispatch();

  const isFavorite = wishlist.includes(targetId!);

  const onClickToSetIsFavorite = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    let newList;

    if (isFavorite) {
      newList = wishlist.filter((item) => item !== targetId);
    } else {
      newList = [...wishlist, targetId];
    }
    dispatch(setUserFavorite(newList));
  };

  const addToCart = () => {
    const productData = {
      data: {
        product_id: targetId!,
        qty: itemQuantity,
      },
    };

    dispatch(setAddItemToCartAsync(productData));
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return {
    itemQuantity,
    wishlist,
    isFavorite,
    onClickToSetIsFavorite,
    addToCart,
  };
};
