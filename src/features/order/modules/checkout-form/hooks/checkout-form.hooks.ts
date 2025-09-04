import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../../store/redux-hooks";

import { CheckoutFormContext } from "../contexts/checkout-form.contexts";
import { setPostUserOrderAsync } from "../../../store/client/userOrder.asyncThunk";
import { checkoutFormConfig } from "../config/checkout-form.config";

import type { CheckoutFormTypes } from "../../../types/admin-orders.types";

export const useCheckoutFormContext = () => {
  const context = useContext(CheckoutFormContext);

  if (!context)
    throw new Error(
      "useCheckoutFormContext must be used within CheckoutFormContextProvider"
    );

  return context;
};

export const useCheckoutFormControl = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormTypes>({ mode: "onTouched" });

  const dispatch = useAppDispatch();

  const onSubmitHandler = handleSubmit((data) => {
    console.log("SHow data", data);
    dispatch(setPostUserOrderAsync(data));
  });

  return {
    register,
    handleSubmit,
    errors,
    checkoutFormConfig,
    onSubmitHandler,
  };
};
