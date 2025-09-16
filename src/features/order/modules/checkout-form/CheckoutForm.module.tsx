import { useCheckoutFormContext } from "./hooks/checkout-form.hooks";

import { CheckoutFormContextProvider } from "./contexts/checkout-form.contexts";

import { CheckoutFormGroup } from "./components/checkout-form-group/CheckoutFormGroup.component";
import { CheckoutFormFooter } from "./components/checkout-form-footer/CheckoutFormFooter.component";

import type { FC } from "react";

import "./CheckoutForm.styles.scss";

const CheckoutFormContent: FC = () => {
  const {
    formControl: { onSubmitHandler },
  } = useCheckoutFormContext();

  return (
    <form className="checkout-form" onSubmit={onSubmitHandler}>
      <CheckoutFormGroup />
      <CheckoutFormFooter />
    </form>
  );
};

export const CheckoutForm: FC = () => {
  return (
    <CheckoutFormContextProvider>
      <CheckoutFormContent />
    </CheckoutFormContextProvider>
  );
};
