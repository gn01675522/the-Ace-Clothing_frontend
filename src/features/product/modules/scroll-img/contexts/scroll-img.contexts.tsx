import { createContext } from "react";
import {
  useChangeImg,
  useGetScreenWidthAndResize,
} from "../hooks/scroll-img-list.hooks";

import type { ReactNode } from "react";
import type { UserProductsDto } from "../../../../product/DTOs/userProduct.dtos";

export type ContextType = {
  detectAndResize: ReturnType<typeof useGetScreenWidthAndResize>;
  imgControl: ReturnType<typeof useChangeImg>;
  neededProductInfo: { title: string; imgSet: string[] };
};

export const ScrollImgContext = createContext<ContextType | null>(null);

type ContextPropsType = {
  children: ReactNode;
  targetProduct: UserProductsDto | null;
};

export const ScrollImgContextProvider = ({
  children,
  targetProduct,
}: ContextPropsType) => {
  const detectAndResize = useGetScreenWidthAndResize();
  const imgControl = useChangeImg(detectAndResize.imgWidth);

  const neededProductInfo = {
    title: targetProduct ? targetProduct.title : "",
    //* 直接將主圖片以及次要圖片組合成一個陣列，方便後續渲染 jsx；如果 imagesUrl 沒有圖片的話，就改成空陣列
    imgSet: targetProduct
      ? [targetProduct?.imageUrl, ...(targetProduct?.imagesUrl || [])]
      : [],
  };

  const value = { imgControl, detectAndResize, neededProductInfo };

  return (
    <ScrollImgContext.Provider value={value}>
      {children}
    </ScrollImgContext.Provider>
  );
};
