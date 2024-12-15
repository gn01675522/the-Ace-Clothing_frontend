import { ReactNode } from "react";
import Button, { BUTTON_TYPE_CLASS } from "../Button/Button.component";

import "./AdminTable.styles.scss";

export enum ADMIN_TABLE_TYPE {
  products = "products",
  coupons = "coupons",
  orders = "orders",
}

type PropsType<T extends { id: string }> = {
  data: T[];
  columns: Array<{
    header: string;
    accessor: keyof T;
  }>;
  onClickToEditHandler: (type: "create" | "edit", target?: T) => void;
  onClickToDeleteHandler: (target: T) => void;
};

type ComponentType = <T extends { id: string }>(
  props: PropsType<T>
) => JSX.Element;

const AdminTable: ComponentType = ({
  data,
  columns,
  onClickToEditHandler,
  onClickToDeleteHandler,
}) => {
  return (
    <table className="admin-table">
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
      <tbody className="admin-table__body">
        {data.map((item) => (
          <tr key={item.id} className="admin-table__body-row">
            {columns.map((column, i) => (
              <td key={i}>{item[column.accessor] as ReactNode}</td>
            ))}
            <td className="admin-table__body-actions">
              <Button
                type="button"
                buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
                onClick={() => onClickToEditHandler("edit", item)}
              >
                編輯
              </Button>
              <Button
                type="button"
                buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
                onClick={() => onClickToDeleteHandler(item)}
              >
                刪除
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
