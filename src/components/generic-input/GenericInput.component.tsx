import type { FC } from "react";
import type { IGenericInput } from "./generic-input.types";

import "./GenericInput.styles.scss";

export const GenericInput: FC<IGenericInput> = ({
  id,
  title,
  message,
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
  const combinedMessageClasses = `generic-input__msg`;

  return (
    <fieldset className={combinedWrapperClasses}>
      <div className="generic-input__wrapper">
        <label htmlFor={id} className={combinedLabelClasses}>
          {title}
        </label>
        {message && <span className={combinedMessageClasses}>{message}</span>}
      </div>
      <input className={combinedInputClasses} id={id} {...props} />
    </fieldset>
  );
};
