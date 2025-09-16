import type { FC, ComponentPropsWithRef } from "react";

import type {
  ITable,
  ITableHeader,
  ITableHead,
  ITableBody,
  ITableRow,
  ITableCell,
  ITableFooter,
} from "./table.types";

import "./Table.styles.scss";

export const Table: FC<ITable> = ({ className, ...props }) => {
  const combinedClasses = `table ${className ? className : ""}`;

  return <table className={combinedClasses} {...props} />;
};

export const TableHeader: FC<ITableHeader> = ({ className, ...props }) => {
  const combinedClasses = `table-header ${className ? className : ""}`;

  return <thead className={combinedClasses} {...props} />;
};

export const TableHead: FC<ITableHead> = ({ className, ...props }) => {
  const combinedClasses = `table-head ${className ? className : ""}`;

  return <th className={combinedClasses} {...props} />;
};

export const TableBody: FC<ITableBody> = ({ className, ...props }) => {
  const combinedClasses = `table-body ${className ? className : ""}`;

  return <tbody className={combinedClasses} {...props} />;
};

export const TableRow: FC<ITableRow> = ({ className, ...props }) => {
  const combinedClasses = `table-row ${className ? className : ""}`;

  return <tr className={combinedClasses} {...props} />;
};

export const TableCell: FC<ITableCell> = ({ className, ...props }) => {
  const combinedClasses = `table-cell ${className ? className : ""}`;

  return <td className={combinedClasses} {...props} />;
};

export const TableFooter: FC<ITableFooter> = ({ className, ...props }) => {
  const combinedClasses = `table-footer ${className ? className : ""}`;

  return <tfoot className={combinedClasses} {...props} />;
};
