import type { ComponentPropsWithRef } from "react";

export interface IGenericSelect extends ComponentPropsWithRef<"select"> {
  id: string;
  title: string;
  options: { id: string; name: string }[];
  message?: string;
  containerClass?: string;
  labelClass?: string;
  selectClass?: string;
  optionClass?: string;
  messageClass?: string;
}
