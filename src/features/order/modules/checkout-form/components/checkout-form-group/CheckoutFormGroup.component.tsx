import { useCheckoutFormContext } from "../../hooks/checkout-form.hooks";

import { GenericInput } from "../../../../../../components";

import type { FC } from "react";

import "./CheckoutFormGroup.styles.scss";

export const CheckoutFormGroup: FC = () => {
  const {
    formControl: {
      register,
      errors,
      checkoutFormConfig: { name, tel, email, address },
    },
  } = useCheckoutFormContext();

  return (
    <div className="checkout-form-group">
      <GenericInput
        title={name.title}
        message={errors[name.key]?.message}
        {...register(name.key, name.rules)}
      />
      <GenericInput
        title={tel.title}
        message={errors[tel.key]?.message}
        {...register(tel.key, tel.rules)}
      />
      <GenericInput
        title={email.title}
        message={errors[email.key]?.message}
        {...register(email.key, email.rules)}
      />
      <GenericInput
        title={address.title}
        message={errors[address.key]?.message}
        {...register(address.key, address.rules)}
      />
    </div>
  );
};
