import type { FC } from "react";
import type { IGenericInput } from "./generic-input.types";

import "./GenericInput.styles.scss";

export const GenericInput: FC<IGenericInput> = ({
  id,
  title,
  type,
  wrapperClass,
  labelClass,
  inputClass,
  ...props
}) => {
  const combinedWrapperClasses = `generic-input ${
    wrapperClass ? wrapperClass : ""
  }`;
  const combinedLabelClasses = `generic-input__label ${
    labelClass ? labelClass : ""
  }`;
  const combinedInputClasses = `generic-input__input ${
    inputClass ? inputClass : ""
  }`;

  return (
    <div className={combinedWrapperClasses}>
      <label htmlFor={id} className={combinedLabelClasses}>
        {title}
      </label>
      <input type={type} className={combinedInputClasses} {...props} />
    </div>
  );
};
