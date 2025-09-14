import { TableBody, TableRow, TableCell } from "@/components";

import type { DataTableColumnType } from "../../types/data-table.types";

import "./DataTableBody.styles.scss";

type PropsType<T> = {
  columns: DataTableColumnType[];
  bodyClass?: { bodyClass?: string; rowClass?: string; cellClass?: string };
};

export const DataTableBody = <T,>({ columns, bodyClass }: PropsType<T>) => {
  const combinedBodyClass = `${bodyClass?.bodyClass ?? ""}`;
  const combinedRowClass = `${bodyClass?.rowClass ?? ""}`;
  const combinedCellClass = `${bodyClass?.cellClass ?? ""}`;

  return (
    <TableBody className={combinedBodyClass}>
      {columns.map((column) => (
        <TableRow key={column.id} className={combinedRowClass}>
          {column.data.map((item) => (
            <TableCell key={item.id} className={combinedCellClass}>
              {item.render()}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
