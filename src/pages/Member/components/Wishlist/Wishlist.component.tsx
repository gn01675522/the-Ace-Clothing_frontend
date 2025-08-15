import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../../components/Button/Button.component";

import {
  fetchCartItemsAsync,
  setAddItemToCartAsync,
  selectCartItems,
  selectCartIsLoading,
} from "../../../../features/cart/index";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import type { FC } from "react";
import type { Product } from "../../../../store/userProduct/userProduct.types";

import "./Wishlist.styles.scss";

type PropsType = {
  wishlist: Product[];
  onClickToRemoveFavorite: (id: string) => void;
};

const Wishlist: FC<PropsType> = ({ wishlist, onClickToRemoveFavorite }) => {
  const cartItems = useAppSelector(selectCartItems);
  const isLoading = useAppSelector(selectCartIsLoading);
  const dispatch = useAppDispatch();

  const isLimit = (id: string) => {
    const productInCart =
      cartItems?.carts?.find((item) => item.product_id === id) || null;
    if (!productInCart || productInCart?.qty < 5) {
      return false;
    } else if (productInCart.qty >= 5) {
      return true;
    }
  };
  //* 尋找購物車內相同產品，並計算是否等於或大於五個

  const addToCart = (id: string) => {
    const productData = {
      data: {
        product_id: id,
        qty: 1,
      },
    };
    dispatch(setAddItemToCartAsync(productData));
  };

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  return (
    <div className="wishlist">
      {wishlist?.map((item) => (
        <div className="wishlist__card" key={item.id}>
          <div className="wishlist__card-content">
            <img
              className="wishlist__card-content-img"
              src={item.imageUrl}
              alt={item.title}
            />
            <div className="wishlist__card-content-info">
              <div className="wishlist__card-content-info-item">
                <div>名稱</div>
                <div>{item.title}</div>
              </div>
              <div className="wishlist__card-content-info-item">
                <div>價格</div>
                <div>NT$ {formatNumberWithCommas(item.price)}</div>
              </div>
            </div>
          </div>
          <div className="wishlist__card-function">
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
              onClick={() => onClickToRemoveFavorite(item.id)}
            >
              刪除
            </Button>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
              disabled={isLimit(item.id) || isLoading}
              onClick={() => addToCart(item.id)}
            >
              {isLimit(item.id) ? "MAX QUANTITY" : "ADD ONE"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
