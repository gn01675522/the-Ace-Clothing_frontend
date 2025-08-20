import { useAppSelector } from "../../../../store/redux-hooks";

import {
  useFetchProductsList,
  useDragToScrollList,
  useDetectWishlistChange,
} from "../../hooks/marketing.hooks";

import {
  Button,
  BUTTON_TYPE_CLASS,
  LeftArrowSVGIcon,
  RightArrowSVGIcon,
} from "../../../../components/index";
import { ScrollItem } from "../../components/scroll-item/ScrollItem.component";

import { selectUserFavorite } from "../../../user/index";

import {
  selectNewUserProducts,
  selectUserProductsOnSale,
} from "../../../product/index";

import {
  SCROLL_CLASSES,
  BANNER_CHANGE_BUTTON_CLASSES,
} from "../../types/marketing.types";

import type { FC } from "react";

import "./ScrollList.styles.scss";

const selectorByType = (type: SCROLL_CLASSES) =>
  ({
    [SCROLL_CLASSES.newArrival]: selectNewUserProducts,
    [SCROLL_CLASSES.onSale]: selectUserProductsOnSale,
  }[type]);

type PropsType = {
  type: SCROLL_CLASSES;
};

export const ScrollList: FC<PropsType> = ({ type }) => {
  const products = useAppSelector(selectorByType(type));
  const wishlist = useAppSelector(selectUserFavorite);

  const {
    listContainerRef,
    contentRef,
    draggingProgress,
    setWidthByListContainer,
    onCheckIsDrag,
    onDragHandler,
    onCancelDrag,
    onScrollHandler,
    onStopScroll,
  } = useDragToScrollList();
  useFetchProductsList();
  useDetectWishlistChange(wishlist);

  return (
    <div className="scroll-list" ref={listContainerRef}>
      <div className="scroll-list__content" ref={contentRef}>
        <ul
          className="scroll-list__content-list"
          onMouseDown={onCheckIsDrag}
          onMouseMove={onDragHandler}
          onMouseUp={onCancelDrag}
          onMouseLeave={onCancelDrag}
        >
          {products.map((product) => {
            const category = product.category.split("-")[0];
            return (
              <li style={{ width: `${setWidthByListContainer}px` }}>
                <ScrollItem
                  product={product}
                  urlParam={category}
                  key={product.id}
                  isDragging={draggingProgress}
                  isFavorite={wishlist.includes(product.id)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        type="button"
        name={BANNER_CHANGE_BUTTON_CLASSES.prev}
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onMouseDown={onScrollHandler}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
      >
        <LeftArrowSVGIcon className="scroll-list__left-arrow" />
      </Button>
      <Button
        type="button"
        name={BANNER_CHANGE_BUTTON_CLASSES.next}
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onMouseDown={onScrollHandler}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
      >
        <RightArrowSVGIcon className="scroll-list__right-arrow" />
      </Button>
    </div>
  );
};
