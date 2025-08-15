import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../../components/Button/Button.component";

import {
  setCartIsModalOpen,
  setCartTempData,
  setUpdateCartItemAsync,
  selectCartLoadingItems,
  type CartItems,
} from "../../../../features/cart/index";

import {
  translateGenderToChinese,
  translateCategoryToChinese,
} from "../../../../utils/common.utils";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import type { FC } from "react";

import "./CartItem.styles.scss";

type PropsType = {
  item: CartItems;
};

const CartItem: FC<PropsType> = ({ item }) => {
  const { id: itemId, qty, final_total } = item;
  const { category, title, imageUrl } = item.product;

  const dispatch = useAppDispatch();

  const loadingItems = useAppSelector(selectCartLoadingItems);

  const clotheCategory = translateGenderToChinese(category).concat(
    translateCategoryToChinese(category)
  );

  //* 每當變更數量的時候，就直接更新購物車資訊
  const updateCartItem = (type: "add" | "minor") => {
    const quantity = type === "add" ? qty + 1 : qty - 1;
    dispatch(setUpdateCartItemAsync({ item, quantity }));
  };

  //* 刪除購物車元件
  const checkedToRemoveItemFromCart = () => {
    dispatch(setCartTempData(itemId));
    dispatch(setCartIsModalOpen(true));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <img
          src={imageUrl}
          className="cart-item__left-img"
          alt={`product in cart: ${title}`}
        />
      </div>

      <div className="cart-item__right">
        <div className="cart-item__right-header">
          <h2 className="cart-item__right-header-title">{title}</h2>
          <p className="cart-item__right-header-category">{clotheCategory}</p>
        </div>
        <div className="cart-item__right-body">
          <div className="cart-item__right-body-content">
            <span className="cart-item__right-body-content-item">
              Color： 預設
            </span>
          </div>
          <div className="cart-item__right-body-content">
            <span className="cart-item__right-body-content-item">
              Size： 預設
            </span>
          </div>
          <div className="cart-item__right-body-content">
            <button
              type="button"
              className="cart-item__right-body-content-remove"
              onClick={checkedToRemoveItemFromCart}
            >
              刪除
            </button>
            <div className="cart-item__right-body-content-count">
              <span>總金額</span>
              <span>NT$ {formatNumberWithCommas(Math.round(final_total))}</span>
            </div>
          </div>
        </div>
        <div className="cart-item__right-footer">
          <Button
            buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
            //* 如果數量等於 1 那麼按下減號鍵就讓它變成刪除功能
            onClick={
              qty === 1
                ? checkedToRemoveItemFromCart
                : () => updateCartItem("minor")
            }
          >
            -
          </Button>
          <input
            className="cart-item__right-footer-entry"
            type="number"
            value={qty}
            readOnly
          />
          <Button
            buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
            onClick={() => updateCartItem("add")}
            disabled={qty >= 5 || loadingItems.includes(itemId)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
