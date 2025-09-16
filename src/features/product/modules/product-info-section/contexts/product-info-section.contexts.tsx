import { createContext } from "react";

import {
  useProductInfoSectionStateFetch,
  useActionControl,
  useChangeQuantityControl,
} from "../hooks/product-info-section.hooks";

import type { ReactNode } from "react";

export type ContextType = {
  stateFetch: ReturnType<typeof useProductInfoSectionStateFetch>;
  actionControl: ReturnType<typeof useActionControl>;
  quantityControl: ReturnType<typeof useChangeQuantityControl>;
  targetId?: string;
};

export const ProductInfoSectionContext = createContext<ContextType | null>(
  null
);

type ContextPropsType = {
  children: ReactNode;
  targetId?: string;
};

export const ProductInfoSectionContextProvider = ({
  children,
  targetId,
}: ContextPropsType) => {
  const stateFetch = useProductInfoSectionStateFetch(targetId);
  const quantityControl = useChangeQuantityControl(
    stateFetch.sameProductInCart
  );
  const actionControl = useActionControl({
    targetId,
    itemQuantity: quantityControl.itemQuantity,
  });

  const value = { stateFetch, quantityControl, actionControl, targetId };

  return (
    <ProductInfoSectionContext value={value}>
      {children}
    </ProductInfoSectionContext>
  );
};
