import { useState, useEffect, useCallback, useRef } from "react";
import { useAppDispatch } from "../../../store/redux-hooks";

import { fetchUserProductAsync } from "../../product/index";

import { computedWidthByContainerHelper } from "../helpers/marketing.helpers";

import { BANNER_CONFIG } from "../config/banner.config";
import { BANNER_CHANGE_BUTTON_CLASSES } from "../types/marketing.types";

import type { MouseEvent } from "react";

const carouselTime = 10000;

export const useCarousel = () => {
  const [imgNum, setImgNum] = useState(0);

  const onClickToChangeBanner = (type: "prev" | "next") => {
    switch (type) {
      case "prev":
        if (imgNum === 0) {
          setImgNum(BANNER_CONFIG.length - 1);
        } else {
          setImgNum(imgNum - 1);
        }
        break;
      case "next":
        if (imgNum === BANNER_CONFIG.length - 1) {
          setImgNum(0);
        } else {
          setImgNum(imgNum + 1);
        }
        break;
      default:
        return;
    }
  };

  const onChangeImg = (i: number) => {
    setImgNum(i);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (imgNum === BANNER_CONFIG.length - 1) {
        setImgNum(0);
      } else {
        setImgNum(imgNum + 1);
      }
    }, carouselTime);
    return () => {
      clearInterval(timer);
    };
  }, [imgNum]);

  return { imgNum, onClickToChangeBanner, onChangeImg };
};

export const useFetchProductsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, []);
};

export const useDetectWishlistChange = (wishlist: string[]) => {
  //* wishlist selector 變動時則將 wishlist 內容放入 localStorage 裡面
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
};

export const useDragToScrollList = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState<number | null>(null);
  const [draggingProgress, setDraggingProgress] = useState(false);
  const [listContainerWidth, setListContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const setWidthByListContainer = computedWidthByContainerHelper(
    windowWidth,
    listContainerWidth
  );

  let keepTrigger: number | null = null;

  //* 判斷 user 是否在列表當中常按滑鼠，是的話將記錄滑鼠起始座標，並將 isDragging 設定為 true
  const onCheckIsDrag = useCallback((e: MouseEvent<HTMLUListElement>) => {
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
    (e: MouseEvent<HTMLUListElement>) => {
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

  //* 使用按鈕滾動卷軸
  const onScrollHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const container = contentRef.current;
    const moveRange = setWidthByListContainer + 16;

    if (container) {
      container.scrollBy({
        left:
          name === BANNER_CHANGE_BUTTON_CLASSES.prev ? -moveRange : moveRange,
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

  return {
    listContainerRef,
    contentRef,
    onCheckIsDrag,
    onDragHandler,
    onCancelDrag,
    draggingProgress,
    setWidthByListContainer,
    onScrollHandler,
    onStopScroll,
  };
};
