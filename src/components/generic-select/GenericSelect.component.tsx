import type { FC } from "react";

import type { IGenericSelect } from "./generic-select.types";

import "./GenericSelect.styles.scss";

export const GenericSelect: FC<IGenericSelect> = ({
  id,
  title,
  options,
  message,
  containerClass,
  labelClass,
  selectClass,
  optionClass,
  messageClass,
  ...props
}) => {
  const combinedContainerClasses = `generic-select ${containerClass ?? ""}`;
  const combinedLabelClasses = `generic-select__label ${labelClass ?? ""}`;
  const combinedSelectClasses = `generic-select__select ${selectClass ?? ""}`;
  const combinedOptionClasses = `generic-select__option ${optionClass ?? ""}`;
  const combinedMessageClasses = `generic-select__msg ${messageClass ?? ""}`;

  return (
    <fieldset className={combinedContainerClasses}>
      <div className="generic-select__wrapper">
        <label htmlFor={id} className={combinedLabelClasses}>
          {title}
        </label>
        {message && <span className={combinedMessageClasses}>{message}</span>}
      </div>
      <select {...props} className={combinedSelectClasses} id={id}>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className={combinedOptionClasses}
          >
            {option.name}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
