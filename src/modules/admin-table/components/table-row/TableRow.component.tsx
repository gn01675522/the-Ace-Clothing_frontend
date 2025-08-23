import { Button, BUTTON_TYPE_CLASS } from "../../../../components";
import { AdminTableCell } from "../table-cell/TableCell.component";

import type { Column } from "../../types/admin-table.types";

type PropsType<T> = {
  data: T;
  columns: Column<T>[];
  onClickToEditHandler: (target: T) => void;
  onClickToDeleteHandler: (target: T) => void;
};

export const TableRow = <T extends { id: number | string }>({
  data,
  columns,
  onClickToEditHandler,
  onClickToDeleteHandler,
}: PropsType<T>) => {
  return (
    <tr key={data.id} className="admin-table__body-row">
      {columns.map((column, i) => (
        <AdminTableCell
          key={i}
          value={data[column.accessor]}
          render={column.render}
        />
      ))}
      <td className="admin-table__body-actions">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
          onClick={() => onClickToEditHandler(data)}
        >
          編輯
        </Button>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
          onClick={() => onClickToDeleteHandler(data)}
        >
          刪除
        </Button>
      </td>
    </tr>
  );
};
