import { Table } from "@/components";

import { DataTableHeader } from "./components/data-table-header/DataTableHeader.component";
import { DataTableBody } from "./components/data-table-body/DataTableBody.component";
import { DataTablePagination } from "./components/data-table-pagination/DataTablePagination.component";

import type { IDataTable } from "./types/data-table.types";

import "./DataTable.styles.scss";

export const DataTable = ({
  config,
  actionControl,
  styleControl,
}: IDataTable) => {
  const { pagination } = actionControl;

  const combinedWrapperClasses = `data-table__wrapper ${
    styleControl?.wrapperClass ?? ""
  }`;
  const combinedTableClasses = `data-table ${styleControl?.tableClass ?? ""}`;

  return (
    <div className={combinedWrapperClasses}>
      <Table className={combinedTableClasses}>
        <DataTableHeader
          headers={config.headers}
          headerStyle={styleControl?.header}
        />
        <DataTableBody
          columns={config.columns}
          bodyClass={styleControl?.body}
        />
      </Table>
      {pagination?.pageCount > 1 && <DataTablePagination {...pagination} />}
    </div>
  );
};
