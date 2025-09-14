import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GenericTable } from "../generic-table/GenericTable.module";

import {
  mockTableData,
  mockColumns,
  type mockTableDataTypes,
} from "../__mocks__/mocks";

describe("Generic Table test suite.", () => {
  test("Calls onClickToEdit and onClickToDelete when edit and delete buttons are clicked.", async () => {
    const onClickToEdit = jest.fn((arg) => arg);
    const onClickToDelete = jest.fn((arg) => arg);
    const user = userEvent.setup();

    render(
      <GenericTable<mockTableDataTypes>
        data={mockTableData}
        columns={mockColumns}
        onClickToEditHandler={onClickToEdit}
        onClickToDeleteHandler={onClickToDelete}
      />
    );

    const editButtons = screen.getAllByRole("button", { name: /編輯/i });
    const deleteButtons = screen.getAllByRole("button", { name: /刪除/i });

    expect(editButtons.length).toBeGreaterThan(0);
    expect(deleteButtons.length).toBeGreaterThan(0);

    await user.click(editButtons[0]);
    await user.click(deleteButtons[0]);

    expect(onClickToEdit).toHaveBeenCalledTimes(1);
    expect(onClickToEdit).toHaveBeenCalledWith(mockTableData[0]);

    expect(onClickToDelete).toHaveBeenCalledTimes(1);
    expect(onClickToDelete).toHaveBeenCalledWith(mockTableData[0]);
  });

  test("Renders all headers correctly using test data.", () => {
    render(
      <GenericTable<mockTableDataTypes>
        data={mockTableData}
        columns={mockColumns}
        onClickToEditHandler={jest.fn()}
        onClickToDeleteHandler={jest.fn()}
      />
    );

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  test("Renders all data rows correctly using test data.", () => {
    render(
      <GenericTable<mockTableDataTypes>
        data={mockTableData}
        columns={mockColumns}
        onClickToEditHandler={jest.fn()}
        onClickToDeleteHandler={jest.fn()}
      />
    );

    const rows = screen.getAllByRole("row");

    //* 由於 header 也會是一行，所以這邊的 length 會 +1
    expect(rows).toHaveLength(mockTableData.length + 1);

    rows.slice(1).forEach((rowElement, index) => {
      const rowData = mockTableData[index];
      const { getByText } = within(rowElement);

      expect(getByText(rowData.id.toString())).toBeInTheDocument();
      expect(getByText(rowData.name)).toBeInTheDocument();
      expect(getByText(rowData.age.toString())).toBeInTheDocument();
      expect(getByText(rowData.gender)).toBeInTheDocument();
    });
  });
});
