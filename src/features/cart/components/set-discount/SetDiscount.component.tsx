import { useCartSetCouponControl } from "../../hooks/cart.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import { type FC } from "react";

export const SetDiscount: FC = () => {
  const { inputValue, applyCoupon, addCoupon, onChangeInputValue } =
    useCartSetCouponControl();

  return (
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
  );
};
