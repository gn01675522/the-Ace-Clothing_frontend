import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => ReactNode;
};
