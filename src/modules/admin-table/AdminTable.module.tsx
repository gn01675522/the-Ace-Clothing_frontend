import { Button, BUTTON_TYPE_CLASS } from "../../components/index";

import type { ReactNode } from "react";

import "./AdminTable.styles.scss";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => ReactNode;
};

type AdminTableHeaderPropsType<T> = {
  columns: Column<T>[];
};

export const AdminTableHeader = <T,>({
  columns,
}: AdminTableHeaderPropsType<T>) => {
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

type AdminTableCellPropsType<T> = {
  value: T;
  render?: (value: T) => ReactNode;
};

const AdminTableCell = <T,>({ value, render }: AdminTableCellPropsType<T>) => {
  return <td>{render ? render(value) : String(value)}</td>;
};

type AdminTableRowPropsType<T> = {
  data: T;
  columns: Column<T>[];
  onClickToEditHandler: (target: T) => void;
  onClickToDeleteHandler: (target: T) => void;
};

const AdminTableRow = <T extends { id: number | string }>({
  data,
  columns,
  onClickToEditHandler,
  onClickToDeleteHandler,
}: AdminTableRowPropsType<T>) => {
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
      <AdminTableHeader columns={columns} />
      <tbody className="admin-table__body">
        {data.map((item) => (
          <AdminTableRow
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
