import { useCartItemContext } from "../../hooks/cart-item.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../../../components/index";

import { QUANTITY_OPERATION_OPTIONS } from "../../../../../../shared/types";

import type { FC } from "react";

export const CartItemFooter: FC = () => {
  const {
    cartItemControl: { onClickToChangeCartItems },
    cartItem: { qty, id },
    loadingItems,
  } = useCartItemContext();

  return (
    <div className="cart-item__right-footer">
      <Button
        buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
        name={QUANTITY_OPERATION_OPTIONS.minus}
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
        name={QUANTITY_OPERATION_OPTIONS.plus}
        onClick={onClickToChangeCartItems}
        disabled={qty >= 5 || loadingItems.includes(id)}
      >
        +
      </Button>
    </div>
  );
};
