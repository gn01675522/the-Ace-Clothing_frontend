import { inputRules } from "./Input.rules";

import type { FC } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { INPUT_CATEGORY } from "./Input.rules";
import type { FormInputs } from "./Input.rules";

import "./Input.styles.scss";

type Config = {
  type: string;
  labelText: string;
};

type PropsType = {
  category: INPUT_CATEGORY;
  config: Config;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

const Input: FC<PropsType> = ({ category, config, register, errors }) => {
  const { type, labelText } = config;
  const rules = inputRules(category);

  return (
    <>
      <label htmlFor={category} className="input__label">
        {labelText}
        {errors[category] && (
          <div className="input__label--invalid-feedback">
            *{errors[category]?.message}
          </div>
        )}
      </label>
      <input
        id={category}
        type={type}
        className={`input__entry ${
          errors[category] ? "input__entry--invalid" : ""
        }`}
        {...register(category, rules)}
      />
    </>
  );
};

export default Input;
