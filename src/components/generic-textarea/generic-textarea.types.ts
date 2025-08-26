import type { ComponentPropsWithRef } from "react";

export interface IGenericTextarea extends ComponentPropsWithRef<"textarea"> {
  id: string;
  title: string;
  wrapperClass?: string;
  labelClass?: string;
  textareaClass?: string;
}
