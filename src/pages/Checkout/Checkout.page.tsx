import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { useForm } from "react-hook-form";

import { OrderCard } from "../../features/order/index";
import SummaryCard from "../../components/SummaryCard/SummaryCard.component";
import { Button, BUTTON_TYPE_CLASS } from "../../components/index";

import { selectCartItems } from "../../features/cart/index";
import {
  selectUserOrderId,
  setPostUserOrderAsync,
} from "../../features/order/index";

import { INPUT_CATEGORY, inputRules } from "./input.rules";

import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { FormInputs } from "./input.rules";

import "./Checkout.styles.scss";

const formContent = [
  {
    category: INPUT_CATEGORY.name,
    config: { type: "text", labelText: "姓名" },
  },
  { category: INPUT_CATEGORY.tel, config: { type: "tel", labelText: "電話" } },
  {
    category: INPUT_CATEGORY.email,
    config: { type: "email", labelText: "email" },
  },
  {
    category: INPUT_CATEGORY.address,
    config: { type: "text", labelText: "地址" },
  },
];

const Checkout: FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const orderId = useAppSelector(selectUserOrderId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(setPostUserOrderAsync(data));
  };

  const onBackToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if (orderId !== null) {
      navigate(`/success/${orderId}`);
    }
  }, [orderId, navigate]);

  return (
    <div className="checkout">
      <form className="checkout__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="checkout__form-title">付款資訊</h1>
        <div className="checkout__form-group">
          {formContent.map(({ category, config }) => (
            <div className="checkout__form-item" key={category}>
              <label
                htmlFor={category}
                className="checkout__form-item__input__label"
              >
                {config.labelText}
                {errors[category] && (
                  <div className="checkout__form-item__input__label--invalid-feedback">
                    *{errors[category]?.message}
                  </div>
                )}
              </label>
              <input
                id={category}
                type={config.type}
                className={`checkout__form-item__input__entry ${
                  errors[category]
                    ? "checkout__form-item__input__entry--invalid"
                    : ""
                }`}
                {...register(category, inputRules(category))}
              />
            </div>
          ))}
        </div>
        <div className="checkout__form-actions">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
            onClick={onBackToCart}
          >
            返回購物車
          </Button>
          <Button type="submit" buttonType={BUTTON_TYPE_CLASS.rectBlackNm}>
            送出訂單
          </Button>
        </div>
      </form>
      <div className="checkout__info">
        <OrderCard products={cartItems?.carts} />
        <SummaryCard total={cartItems?.final_total} />
      </div>
    </div>
  );
};

export default Checkout;
