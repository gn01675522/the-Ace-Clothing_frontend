import type { ComponentPropsWithRef } from "react";

export interface ITable extends ComponentPropsWithRef<"table"> {
  className?: string;
}

export interface ITableHeader extends ComponentPropsWithRef<"thead"> {
  className?: string;
}

export interface ITableHead extends ComponentPropsWithRef<"th"> {
  className?: string;
}

export interface ITableBody extends ComponentPropsWithRef<"tbody"> {
  className?: string;
}

export interface ITableRow extends ComponentPropsWithRef<"tr"> {
  className?: string;
}

export interface ITableCell extends ComponentPropsWithRef<"td"> {
  className?: string;
}

export interface ITableFooter extends ComponentPropsWithRef<"tfoot"> {
  className?: string;
}
