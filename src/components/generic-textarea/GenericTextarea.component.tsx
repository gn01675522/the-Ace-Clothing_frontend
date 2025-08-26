import type { FC } from "react";
import type { IGenericTextarea } from "./generic-textarea.types";

import "./GenericTextarea.styles.scss";

export const GenericTextarea: FC<IGenericTextarea> = ({
  id,
  title,
  wrapperClass,
  labelClass,
  textareaClass,
  ...props
}) => {
  const combinedWrapperClasses = `generic-textarea ${
    wrapperClass ? wrapperClass : ""
  }`;
  const combinedLabelClasses = `generic-textarea__label ${
    labelClass ? labelClass : ""
  }`;
  const combinedTextareaClasses = `generic-textarea__textarea ${
    textareaClass ? textareaClass : ""
  }`;

  return (
    <fieldset className={combinedWrapperClasses}>
      <label htmlFor={id} className={combinedLabelClasses}>
        {title}
      </label>
      <textarea className={combinedTextareaClasses} id={id} {...props} />
    </fieldset>
  );
};
