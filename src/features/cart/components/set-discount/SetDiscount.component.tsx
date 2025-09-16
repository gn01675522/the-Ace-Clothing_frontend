import { useCartSetCouponControl } from "../../hooks/cart.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import type { FC } from "react";

import "./SetDiscount.styles.scss";

export const SetDiscount: FC = () => {
  const { inputValue, applyCoupon, addCoupon, onChangeInputValue } =
    useCartSetCouponControl();

  return (
    <div className="set-discount">
      <h2 className="set-discount__title">套用折扣碼</h2>
      <div className="set-discount__area">
        <input
          type="text"
          placeholder="請輸入折扣碼"
          className="set-discount__area-input"
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
        <span className="set-discount__in-use">已套用優惠券 {applyCoupon}</span>
      )}
    </div>
  );
};
