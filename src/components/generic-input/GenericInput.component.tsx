import type { FC } from "react";
import type { IGenericInput } from "./generic-input.types";

import "./GenericInput.styles.scss";

export const GenericInput: FC<IGenericInput> = ({
  id,
  title,
  message,
  containerClass,
  labelClass,
  inputClass,
  ...props
}) => {
  const combinedContainerClasses = `generic-input ${containerClass ?? ""}`;
  const combinedLabelClasses = `generic-input__label ${labelClass ?? ""}`;
  const combinedInputClasses = `generic-input__input ${inputClass ?? ""}`;
  const combinedMessageClasses = `generic-input__msg`;

  return (
    <fieldset className={combinedContainerClasses}>
      {title && (
        <div className="generic-input__wrapper">
          <label htmlFor={id} className={combinedLabelClasses}>
            {title}
          </label>
          {message && <span className={combinedMessageClasses}>{message}</span>}
        </div>
      )}
      <input className={combinedInputClasses} id={id} {...props} />
    </fieldset>
  );
};
