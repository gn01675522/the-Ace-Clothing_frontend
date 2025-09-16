import { useNavigate } from "react-router-dom";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import type { FC } from "react";

import "./CheckoutFormFooter.styles.scss";

export const CheckoutFormFooter: FC = () => {
  const navigate = useNavigate();

  const onBackToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="checkout-form-footer">
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
        onClick={onBackToCart}
      >
        返回購物車
      </Button>
      <Button type="submit" buttonType={BUTTON_TYPE_CLASS.rectBlackNm}>
        送出訂單
      </Button>
    </div>
  );
};
