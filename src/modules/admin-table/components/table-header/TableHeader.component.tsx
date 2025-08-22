import type { Column } from "../../types/admin-table.types";

type AdminTableHeaderPropsType<T> = {
  columns: Column<T>[];
};

export const TableHeader = <T,>({ columns }: AdminTableHeaderPropsType<T>) => {
  return (
    <thead className="admin-table__header">
      <tr className="admin-table__header-row">
        {columns.map((column, i) => {
          return (
            <th key={i} scope="col">
              {column.header}
            </th>
          );
        })}
        <th>編輯</th>
      </tr>
    </thead>
  );
};
