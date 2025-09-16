import type { ReactNode, ComponentPropsWithRef, ComponentType } from "react";

export type DataTableHeaderType = {
  id: string;
  render: ReactNode;
};

export type DataTableColumnType = {
  id: string;
  data: {
    id: string;
    render: () => ReactNode | string | number;
  }[];
};

export type DataTableConfig = {
  headers: DataTableHeaderType[];
  columns: DataTableColumnType[];
};

export interface IDataTable extends ComponentPropsWithRef<"table"> {
  config: DataTableConfig;
  actionControl: {
    pagination: {
      currentPage: number;
      pageCount: number;
      onChangePage: (page: number) => void;
    };
  };
  styleControl?: {
    wrapperClass?: string;
    tableClass?: string;
    header?: { headerClass?: string; rowClass?: string; headClass?: string };
    body?: { bodyClass?: string; rowClass?: string; cellClass?: string };
  };
}
