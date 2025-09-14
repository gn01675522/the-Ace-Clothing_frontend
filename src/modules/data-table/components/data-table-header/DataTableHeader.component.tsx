import { TableHeader, TableHead, TableRow } from "@/components";

import type { FC } from "react";
import type { DataTableHeaderType } from "../../types/data-table.types";

import "./DataTableHeader.styles.scss";

type DataTableHeaderPropsType = {
  headers: DataTableHeaderType[];
  headerStyle?: { headerClass?: string; rowClass?: string; headClass?: string };
};

export const DataTableHeader: FC<DataTableHeaderPropsType> = ({
  headers,
  headerStyle,
}) => {
  const combinedHeaderClass = `data-table-header ${
    headerStyle?.headerClass ?? ""
  }`;
  const combinedRowClass = `data-table-header__row ${
    headerStyle?.rowClass ?? ""
  }`;
  const combinedHeadClass = ``;

  return (
    <TableHeader className={combinedHeaderClass}>
      <TableRow className={combinedRowClass}>
        {headers.map((header) => {
          return (
            <TableHead
              key={header.id}
              scope="col"
              className={combinedHeadClass}
            >
              {header.render}
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
};
