import type { ComponentPropsWithRef } from "react";

export interface IToggleSwitch extends ComponentPropsWithRef<"input"> {
  id: string;
  title: string;
  wrapperClass?: string;
  labelClass?: string;
  toggleWrapperClass?: string;
  toggleClass?: string;
}
