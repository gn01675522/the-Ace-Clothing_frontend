import { FC, ButtonHTMLAttributes } from "react";

import "./Button.styles.scss";

export enum BUTTON_TYPE_CLASS {
  rectBlackNm = "rect-black-nm",
  rectBlackMe = "rect-black-me",
  rectBlackSm = "rect-black-sm",
  rectWhiteLg = "rect-white-lg",
  rectWhiteNm = "rect-white-nm",
  rectWhiteSm = "rect-white-sm",
  rectWhiteBdLg = "rect-white-bd-lg",
  rectWhiteOpacityLSm = "rect-white-opacity-l-sm",
  rectWhiteOpacityRSm = "rect-white-opacity-r-sm",
  squareBlackMe = "square-black-me",
  squareBlackSm = "square-black-sm",
  squareWhiteSm = "square-white-sm",
  arcBlackLg = "arc-black-lg",
  arcWhiteOpacitySm = "arc-white-opacity-sm",
}

const getClass = (
  buttonType: BUTTON_TYPE_CLASS = BUTTON_TYPE_CLASS.rectBlackNm
): string =>
  ({
    [BUTTON_TYPE_CLASS.rectBlackNm]: "btn-rect-bl-nm",
    [BUTTON_TYPE_CLASS.rectBlackMe]: "btn-rect-bl-me",
    [BUTTON_TYPE_CLASS.rectBlackSm]: "btn-rect-bl-Sm",
    [BUTTON_TYPE_CLASS.rectWhiteLg]: "btn-rect-wh-lg",
    [BUTTON_TYPE_CLASS.rectWhiteNm]: "btn-rect-wh-nm",
    [BUTTON_TYPE_CLASS.rectWhiteSm]: "btn-rect-wh-sm",
    [BUTTON_TYPE_CLASS.rectWhiteBdLg]: "btn-rect-wh-bd",
    [BUTTON_TYPE_CLASS.rectWhiteOpacityLSm]: "btn-sq-wh-opacity-l-sm",
    [BUTTON_TYPE_CLASS.rectWhiteOpacityRSm]: "btn-sq-wh-opacity-r-sm",
    [BUTTON_TYPE_CLASS.squareBlackMe]: "btn-sq-bl-me",
    [BUTTON_TYPE_CLASS.squareBlackSm]: "btn-sq-bl-sm",
    [BUTTON_TYPE_CLASS.squareWhiteSm]: "btn-sq-wh-sm",
    [BUTTON_TYPE_CLASS.arcBlackLg]: "btn-arc-bl-lg",
    [BUTTON_TYPE_CLASS.arcWhiteOpacitySm]: "btn-arc-white-opacity-sm",
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASS;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  const buttonClass = getClass(buttonType);

  return (
    <button disabled={isLoading} className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
