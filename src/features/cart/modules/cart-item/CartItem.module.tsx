import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import { setCartIsModalOpen, setCartTempData } from "../../store/cart.slice";
import { setUpdateCartItemAsync } from "../../store/cart.asyncThunk";
import { selectCartLoadingItems } from "../../store/cart.selector";

import {
  translateGenderToChinese,
  translateCategoryToChinese,
} from "../../../../utils/common.utils";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import type { FC, MouseEvent } from "react";
import type { CartItems } from "../../DTOs/cart.dtos";

import "./CartItem.styles.scss";

type PropsType = {
  item: CartItems;
};

//todo need refactor
export const CartItem: FC<PropsType> = ({ item }) => {
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

  const onClickToChangeCartItems = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if ((name === "minor" && qty > 1) || name === "add") {
      updateCartItem(name);
    } else {
      dispatch(setCartTempData(itemId));
      dispatch(setCartIsModalOpen(true));
    }
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
              name="delete"
              className="cart-item__right-body-content-remove"
              onClick={onClickToChangeCartItems}
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
            name="minor"
            onClick={onClickToChangeCartItems}
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
            name="add"
            onClick={onClickToChangeCartItems}
            disabled={qty >= 5 || loadingItems.includes(itemId)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
