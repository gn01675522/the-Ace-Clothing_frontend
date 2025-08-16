import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { NavLink } from "react-router-dom";

import { CartItem } from "../../features/cart/index";
import { Categories } from "../../features/navigation/index";
import { DeleteInCartModal } from "../../modules/index";
import {
  Button,
  BUTTON_TYPE_CLASS,
  Loading,
  Message,
} from "../../components/index";

import {
  setCartIsModalOpen,
  fetchCartItemsAsync,
  setAddCouponForCartAsync,
  selectCartItems,
  selectCartModalOpen,
  selectCartIsLoading,
} from "../../features/cart/index";
import { selectHasMessage } from "../../store/message/message.selector";

import { formatNumberWithCommas } from "../../utils/common.utils";

import type { FC, ChangeEvent } from "react";

import "./Cart.styles.scss";

const Cart: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [applyCoupon, setApplyCoupon] = useState("");

  const cartItems = useAppSelector(selectCartItems);
  const hasMessage = useAppSelector(selectHasMessage);
  const isModalOpen = useAppSelector(selectCartModalOpen);
  const isLoading = useAppSelector(selectCartIsLoading);

  const dispatch = useAppDispatch();

  const addCoupon = async () => {
    await dispatch(setAddCouponForCartAsync(inputValue));
    setApplyCoupon(inputValue);
    await dispatch(fetchCartItemsAsync());
  };

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const couponCode = e.target.value;
    setInputValue(couponCode);
  };

  const onClickToCloseModalInBackdrop = () => {
    dispatch(setCartIsModalOpen(false));
  };
  //* 讓 user 可以再開啟是否刪除的 modal 時，不小心按到旁邊的 backdrop 可以直接關閉

  useEffect(() => {
    if (cartItems?.carts?.[0]?.coupon) {
      setApplyCoupon(cartItems.carts[0].coupon.code);
    } else {
      return;
    }
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  return (
    <div className="cart">
      {isLoading && <Loading />}
      {hasMessage && <Message />}
      {isModalOpen && (
        <DeleteInCartModal backdropClose={onClickToCloseModalInBackdrop} />
      )}
      <div className="cart__content">
        <h1 className="cart__content-title">
          {cartItems?.carts?.length > 0
            ? `購物車(${cartItems?.carts?.length})`
            : "您的購物車內沒有商品，去購物吧！"}
        </h1>
        {cartItems?.carts?.length > 0 ? (
          cartItems?.carts?.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })
        ) : (
          <Categories />
        )}
      </div>
      <div className="cart__info">
        <div className="cart__info-price">
          <div className="cart__info-price-items">
            <span>小計</span>
            <span>
              NT$ {formatNumberWithCommas(Math.round(cartItems.final_total))}
            </span>
          </div>
          <div className="cart__info-price-items">
            <span>運費</span>
            <span>免費</span>
          </div>
          <div className="cart__info-price-items">
            <span>總計</span>
            <span>
              NT$ {formatNumberWithCommas(Math.round(cartItems.final_total))}
            </span>
          </div>
        </div>

        {cartItems?.carts?.length > 0 && (
          <div className="cart__info-discount">
            <h2 className="cart__info-discount-title">套用折扣碼</h2>
            <div className="cart__info-discount-area">
              <input
                type="text"
                placeholder="請輸入折扣碼"
                className="cart__info-discount-area-input"
                value={inputValue}
                onChange={onChangeInputValue}
              />
              <Button
                type="button"
                buttonType={BUTTON_TYPE_CLASS.rectWhiteSm}
                disabled={!inputValue}
                onClick={addCoupon}
              >
                套用
              </Button>
            </div>
            {applyCoupon && (
              <span className="cart__info-discount-in-use">
                已套用優惠券 {applyCoupon}
              </span>
            )}
          </div>
        )}

        <div className="cart__info-checkout">
          {cartItems?.carts?.length !== 0 && (
            <>
              <NavLink to="/checkout" className="cart__info-checkout-link">
                前往付款
              </NavLink>
              <NavLink to="/" className="cart__info-checkout-go-shop">
                繼續購物
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
