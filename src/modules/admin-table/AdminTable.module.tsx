import { Column } from "./types/admin-table.types";
import { TableHeader } from "./components/table-header/TableHeader.component";
import { TableRow } from "./components/table-row/TableRow.component";

import "./AdminTable.styles.scss";

type AdminPropsType<T extends { id: string | number }> = {
  data: T[];
  columns: Column<T>[];
  onClickToEditHandler: (target: T) => void;
  onClickToDeleteHandler: (target: T) => void;
};

export const AdminTable = <T extends { id: string | number }>({
  data,
  columns,
  onClickToEditHandler,
  onClickToDeleteHandler,
}: AdminPropsType<T>) => {
  return (
    <table className="admin-table">
      <TableHeader columns={columns} />
      <tbody className="admin-table__body">
        {data.map((item) => (
          <TableRow
            key={item.id}
            data={item}
            columns={columns}
            onClickToEditHandler={onClickToEditHandler}
            onClickToDeleteHandler={onClickToDeleteHandler}
          />
        ))}
      </tbody>
    </table>
  );
};
