import { useState, useEffect, useRef, useContext } from "react";

import { ScrollImgContext } from "../contexts/scroll-img.contexts";

export const useScrollImgContext = () => {
  const context = useContext(ScrollImgContext);

  if (!context)
    throw new Error(
      "useScrollImgContext must be used within ScrollImgContextProvider"
    );

  return context;
};

export const useGetScreenWidthAndResize = () => {
  const [imgWidth, setImgWidth] = useState(0);

  const imgContainerRef = useRef<HTMLLIElement>(null);

  //* 防止組件剛掛載 product 並無法馬上取得資料導致 DOM 抓不到的問題；
  //* 以及解決 imgWidth 只會抓取第一次組件 mount 時的寬度，而不會隨著螢幕尺寸改變的問題
  useEffect(() => {
    const detectResize = () => {
      const imgInitialWidth = imgContainerRef.current?.clientWidth;
      if (imgInitialWidth) {
        setImgWidth(imgInitialWidth);
      }
    };
    //* 偵測螢幕寬度，並儲存起來
    detectResize();

    window.addEventListener("resize", detectResize);
    //* cleanup 函式
    return () => {
      window.removeEventListener("resize", detectResize);
    };
  }, []);

  return { imgWidth, imgContainerRef };
};

export const useChangeImg = (imgWidth: number) => {
  const imgPreviewRef = useRef<HTMLUListElement>(null);

  //* 以 ul 為目標，如果按鈕回傳的為 prev，那麼就減少 imgWidth，讓圖片由右往左，反之。
  const onChangeImg = (type: "prev" | "next") => {
    const previewContainer = imgPreviewRef.current;
    if (previewContainer) {
      previewContainer.scrollLeft += type === "prev" ? -imgWidth : imgWidth;
    }
  };
  return { imgPreviewRef, onChangeImg };
};
