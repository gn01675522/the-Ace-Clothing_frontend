import {
  Button,
  BUTTON_TYPE_CLASS,
  RedHeartSVGIcon,
  WhiteHeartSVGIcon,
} from "../../../../../../components/index";

import { useProductInfoSectionContext } from "../../hooks/product-info-section.hooks";

import { productInfoSectionFooterConfig } from "../../config/product-info-section.config";

import type { FC } from "react";

import "./ProductInfoSectionFooter.styles.scss";

export const ProductInfoSectionFooter: FC = () => {
  const {
    stateFetch: { isCartLoading, sameProductInCart },
    quantityControl: { onChangeQuantity, remainingQuantity },
    actionControl: {
      isFavorite,
      itemQuantity,
      addToCart,
      onClickToSetIsFavorite,
    },
  } = useProductInfoSectionContext();

  const { alertText, addCartButtonText } = productInfoSectionFooterConfig(
    itemQuantity,
    sameProductInCart?.qty || 0,
    remainingQuantity
  );

  return (
    <div className="product-info-section-footer">
      {remainingQuantity <= 0 && (
        <span className="product-info-section-footer__alert">{alertText}</span>
      )}
      <div className="product-info-section-footer__quantity">
        <Button
          buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
          name="minor"
          onClick={onChangeQuantity}
          disabled={isCartLoading || itemQuantity === 1}
        >
          -
        </Button>
        <input
          className="product-info-section-footer__input"
          type="number"
          name="productQuantity"
          value={itemQuantity}
          readOnly
        />
        <Button
          buttonType={BUTTON_TYPE_CLASS.squareWhiteSm}
          name="add"
          onClick={onChangeQuantity}
          disabled={isCartLoading || remainingQuantity <= 0}
        >
          +
        </Button>
      </div>

      <Button
        buttonType={BUTTON_TYPE_CLASS.rectWhiteBdLg}
        onClick={addToCart}
        disabled={isCartLoading || remainingQuantity < 0}
      >
        {addCartButtonText}
      </Button>
      <div
        className="product-info-section-footer__wrapper"
        onClick={onClickToSetIsFavorite}
      >
        {isFavorite ? (
          <RedHeartSVGIcon className="product-info-section-footer__favorite" />
        ) : (
          <WhiteHeartSVGIcon className="product-info-section-footer__favorite" />
        )}
        <p>加入收藏清單</p>
      </div>
    </div>
  );
};
