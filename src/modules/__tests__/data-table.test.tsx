import { screen, render, within, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataTable } from "../data-table/DataTable.module";

import {
  mockDataTableData,
  mockDataTablePagination,
  mockDataTableConfig,
} from "../__mocks__/modules.mocks";

describe("Generic Table test suite.", () => {
  test("Calls onClickToEdit and onClickToDelete when edit and delete buttons are clicked.", async () => {
    const onClickToEdit = jest.fn();
    const onClickToDelete = jest.fn();
    const onClickToChangePage = jest.fn();
    const user = userEvent.setup();

    const config = mockDataTableConfig({
      onClickToEditHandler: onClickToEdit,
      onClickToDeleteHandler: onClickToDelete,
    });

    render(
      <DataTable
        config={config}
        actionControl={{
          pagination: mockDataTablePagination(onClickToChangePage),
        }}
      />
    );

    const editButtons = screen.getAllByRole("button", { name: /編輯/i });
    const deleteButtons = screen.getAllByRole("button", { name: /刪除/i });

    expect(editButtons.length).toBeGreaterThan(0);
    expect(deleteButtons.length).toBeGreaterThan(0);

    await user.click(editButtons[0]!);
    await user.click(deleteButtons[0]!);

    expect(onClickToEdit).toHaveBeenCalledTimes(1);
    expect(onClickToEdit).toHaveBeenCalledWith(mockDataTableData[0]);

    expect(onClickToDelete).toHaveBeenCalledTimes(1);
    expect(onClickToDelete).toHaveBeenCalledWith(mockDataTableData[0]);
  });

  test("Renders all headers correctly using test data.", () => {
    const onClickToEdit = jest.fn();
    const onClickToDelete = jest.fn();
    const onClickToChangePage = jest.fn();

    const config = mockDataTableConfig({
      onClickToEditHandler: onClickToEdit,
      onClickToDeleteHandler: onClickToDelete,
    });

    render(
      <DataTable
        config={config}
        actionControl={{
          pagination: mockDataTablePagination(onClickToChangePage),
        }}
      />
    );

    config.headers.forEach((column) => {
      expect(
        screen.getByRole("columnheader", { name: column.render })
      ).toBeInTheDocument();
    });
  });

  test("Renders all data rows correctly using test data.", () => {
    const onClickToEdit = jest.fn();
    const onClickToDelete = jest.fn();
    const onClickToChangePage = jest.fn();

    const config = mockDataTableConfig({
      onClickToEditHandler: onClickToEdit,
      onClickToDeleteHandler: onClickToDelete,
    });

    render(
      <DataTable
        config={config}
        actionControl={{
          pagination: mockDataTablePagination(onClickToChangePage),
        }}
      />
    );

    const rows = screen.getAllByRole("row");

    //* 由於 header 也會是一行，所以這邊的 length 會 +1
    expect(rows).toHaveLength(mockDataTableData.length + 1);

    rows.slice(1).forEach((rowElement, index) => {
      const rowData = mockDataTableData[index];
      const { getByText } = within(rowElement);

      expect(getByText(rowData?.category!)).toBeInTheDocument();
      expect(getByText(rowData?.title!)).toBeInTheDocument();
      expect(getByText(rowData?.price.toString()!)).toBeInTheDocument();
      expect(
        getByText(rowData?.is_enabled ? "已啟用" : "未啟用")
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "編輯" })).toBeInTheDocument();
    });
  });
});
