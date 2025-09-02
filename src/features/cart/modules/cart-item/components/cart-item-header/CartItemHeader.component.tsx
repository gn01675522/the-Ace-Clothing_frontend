import { useCartItemContext } from "../../hooks/cart-item.hooks";

import {
  translateGenderToChinese,
  translateCategoryToChinese,
} from "../../../../../../utils/common.utils";

import type { FC } from "react";

export const CartItemHeader: FC = () => {
  const {
    cartItem: {
      product: { title, category },
    },
  } = useCartItemContext();

  const clotheCategory = translateGenderToChinese(category).concat(
    translateCategoryToChinese(category)
  );

  return (
    <div className="cart-item__right-header">
      <h2 className="cart-item__right-header-title">{title}</h2>
      <p className="cart-item__right-header-category">{clotheCategory}</p>
    </div>
  );
};
