import type { ComponentPropsWithRef } from "react";

export enum GENERIC_INPUT_TYPES {
  text = "text",
  number = "number",
  date = "date",
  email = "email",
  tel = "tel",
  password = "password",
}

export interface IGenericInput extends ComponentPropsWithRef<"input"> {
  message?: string;
  wrapperClass?: string;
  labelClass?: string;
  inputClass?: string;
}
