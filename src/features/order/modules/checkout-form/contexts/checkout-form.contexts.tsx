import { createContext } from "react";

import { useCheckoutFormControl } from "../hooks/checkout-form.hooks";

import type { ReactNode } from "react";

export type ContextType = {
  formControl: ReturnType<typeof useCheckoutFormControl>;
  //   onCloseHandler: () => void;
  //   onSubmitHandler: () => void;
};

type ContextPropsType = {
  children: ReactNode;
};

export const CheckoutFormContext = createContext<ContextType | null>(null);

export const CheckoutFormContextProvider = ({ children }: ContextPropsType) => {
  const formControl = useCheckoutFormControl();

  const value = { formControl };

  return (
    <CheckoutFormContext.Provider value={value}>
      {children}
    </CheckoutFormContext.Provider>
  );
};
