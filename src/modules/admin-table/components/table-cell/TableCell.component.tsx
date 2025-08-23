import type { ReactNode } from "react";

type AdminTableCellPropsType<T> = {
  value: T;
  render?: (value: T) => ReactNode;
};

export const AdminTableCell = <T,>({
  value,
  render,
}: AdminTableCellPropsType<T>) => {
  return <td>{render ? render(value) : String(value)}</td>;
};
