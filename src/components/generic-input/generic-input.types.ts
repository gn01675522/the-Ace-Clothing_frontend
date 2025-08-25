import type { ComponentPropsWithRef } from "react";

export enum GENERIC_INPUT_TYPES {
  text = "text",
  number = "number",
  date = "date",
}

export interface IGenericInput extends ComponentPropsWithRef<"input"> {
  id: string;
  title: string;
  type: GENERIC_INPUT_TYPES;
  wrapperClass?: string;
  labelClass?: string;
  inputClass?: string;
}
