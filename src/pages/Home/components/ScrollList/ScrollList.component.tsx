import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";

import LeftArrowSVGIcon from "../../../../components/SVGIcons/LeftArrowSVGIcon.component";
import RightArrowSVGIcon from "../../../../components/SVGIcons/RightArrowSVGIcon.component";
import ScrollItem from "../ScrollItem/ScrollItem.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../../components/Button/Button.component";

import { selectUserFavorite } from "../../../../store/user/user.selector";
import { fetchUserProductAsync } from "../../../../store/userProduct/userProduct.asyncThunk";
import {
  selectNewUserProducts,
  selectUserProductsOnSale,
} from "../../../../store/userProduct/userProduct.selector";

import { computedWidthByContainerHelper } from "./ScrollList.helpers";

import type { FC, MouseEvent } from "react";

import "./ScrollList.styles.scss";

export enum SCROLL_TYPE {
  newArrival = "newArrival",
  onSale = "onSale",
}

const scrollList = (type: SCROLL_TYPE) =>
  ({
    [SCROLL_TYPE.newArrival]: selectNewUserProducts,
    [SCROLL_TYPE.onSale]: selectUserProductsOnSale,
  }[type]);

type PropsType = {
  type: SCROLL_TYPE;
};

const ScrollList: FC<PropsType> = ({ type }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState<number | null>(null);
  const [draggingProgress, setDraggingProgress] = useState(false);
  const [listContainerWidth, setListContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const dispatch = useAppDispatch();

  const products = useAppSelector(scrollList(type));
  const wishlist = useAppSelector(selectUserFavorite);

  const contentRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const setWidthByListContainer = computedWidthByContainerHelper(
    windowWidth,
    listContainerWidth
  );

  let keepTrigger: number | null = null;

  //* 使用按鈕滾動卷軸
  const onScrollHandler = (type: "prev" | "next") => {
    const container = contentRef.current;
    const moveRange = setWidthByListContainer + 16;

    if (container) {
      container.scrollBy({
        left: type === "prev" ? -moveRange : moveRange,
        behavior: "smooth",
      });
    }
  };

  //* 清空 setTimeout 及 keepTrigger
  const onStopScroll = () => {
    if (keepTrigger !== null) {
      clearTimeout(keepTrigger);
      keepTrigger = null;
    }
  };

  //* 判斷 user 是否在列表當中常按滑鼠，是的話將記錄滑鼠起始座標，並將 isDragging 設定為 true
  const onCheckIsDrag = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setStartDistance(e.pageX);
    setIsDragging(true);
  }, []);

  //* 如果 user 從拖曳狀態放開滑鼠，則判斷為結束拖曳，故將相關狀態設定為 false
  const onCancelDrag = useCallback(() => {
    setIsDragging(false);
    setDraggingProgress(false);
  }, []);

  //* 如果 isDragging 為 false，也就是 user 沒有在做拖動動作則 return；反之則開始列表移動，移動的根據為起始位置減目前位置
  const onDragHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      setDraggingProgress(true);
      const distance = startDistance ? startDistance - e.pageX : 0;
      const container = contentRef.current;

      if (container) {
        container.scrollBy({
          left: distance,
          behavior: "auto",
        });
      }

      setStartDistance(e.clientX);
    },
    [isDragging, startDistance]
  );

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, [dispatch]);

  useEffect(() => {
    const updateListContainerWidth = () => {
      if (listContainerRef.current) {
        setListContainerWidth(listContainerRef.current.offsetWidth);
      }
    };

    updateListContainerWidth();

    window.addEventListener("resize", updateListContainerWidth);

    return () => {
      window.removeEventListener("resize", updateListContainerWidth);
    };
  }, []);

  useEffect(() => {
    const screenWidth = () => {
      if (window.innerWidth) {
        setWindowWidth(window.innerWidth);
      }
    };

    screenWidth();

    window.addEventListener("resize", screenWidth);
  }, []);

  //* selector 變動時則將 wishlist 內容放入 localStorage 裡面
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="scroll-list" ref={listContainerRef}>
      <div className="scroll-list__content" ref={contentRef}>
        <div
          className="scroll-list__content-list"
          onMouseDown={(e) => onCheckIsDrag(e)}
          onMouseMove={(e) => onDragHandler(e)}
          onMouseUp={onCancelDrag}
          onMouseLeave={onCancelDrag}
        >
          {products.map((product) => {
            const category = product.category.split("-")[0];
            return (
              <ScrollItem
                product={product}
                urlParam={category}
                key={product.id}
                isDragging={draggingProgress}
                isFavorite={wishlist.includes(product.id)}
                style={{ width: `${setWidthByListContainer}px` }}
              />
            );
          })}
        </div>
      </div>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onMouseDown={() => onScrollHandler("prev")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
        title="previous"
      >
        <LeftArrowSVGIcon className="scroll-list__left-arrow" />
      </Button>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onMouseDown={() => onScrollHandler("next")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
        title="next"
      >
        <RightArrowSVGIcon className="scroll-list__right-arrow" />
      </Button>
    </div>
  );
};

export default ScrollList;
