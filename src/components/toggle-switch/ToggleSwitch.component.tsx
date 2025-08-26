import type { FC } from "react";

import type { IToggleSwitch } from "./toggle-switch.types";

import "./ToggleSwitch.styles.scss";

export const ToggleSwitch: FC<IToggleSwitch> = ({
  id,
  title,
  wrapperClass,
  labelClass,
  toggleWrapperClass,
  toggleClass,
  ...props
}) => {
  const combinedWrapperClass = `toggle-switch ${
    wrapperClass ? wrapperClass : ""
  }`;
  const combinedTitleClass = `toggle-switch__title ${
    labelClass ? labelClass : ""
  }`;
  const combinedToggleWrapperClass = `toggle-switch__toggle-wrapper ${
    toggleWrapperClass ? toggleWrapperClass : ""
  }`;
  const combinedToggleClass = `toggle-switch__toggle ${
    toggleClass ? toggleClass : ""
  }`;

  return (
    <fieldset className={combinedWrapperClass}>
      <span className={combinedTitleClass}>{title}</span>
      <input
        id={id}
        {...props}
        type="checkbox"
        className="toggle-switch__input"
      />
      <label htmlFor={id} className={combinedToggleWrapperClass}>
        <div className={combinedToggleClass} />
      </label>
    </fieldset>
  );
};
