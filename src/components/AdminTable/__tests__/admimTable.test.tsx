import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AdminTable from "../AdminTable.component";

type dataType = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
};

const data: dataType[] = [
  { id: 1, name: "Jack", age: 23, gender: "male" },
  { id: 2, name: "Susan", age: 60, gender: "female" },
  { id: 3, name: "Millie", age: 27, gender: "female" },
];

const columns = [
  { header: "id", accessor: "id" },
  { header: "name", accessor: "name" },
  { header: "age", accessor: "age" },
  { header: "gender", accessor: "gender" },
] as { header: string; accessor: keyof dataType }[];

describe("Admin Table test suite.", () => {
  test("Calls onClickToEdit and onClickToDelete when edit and delete buttons are clicked.", async () => {
    const onClickToEdit = jest.fn((arg) => arg);
    const onClickToDelete = jest.fn((arg) => arg);
    const user = userEvent.setup();

    render(
      <AdminTable<dataType>
        data={data}
        columns={columns}
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
    expect(onClickToEdit).toHaveBeenCalledWith(data[0]);

    expect(onClickToDelete).toHaveBeenCalledTimes(1);
    expect(onClickToDelete).toHaveBeenCalledWith(data[0]);
  });

  test("Renders all headers correctly using test data.", () => {
    render(
      <AdminTable<dataType>
        data={data}
        columns={columns}
        onClickToEditHandler={jest.fn()}
        onClickToDeleteHandler={jest.fn()}
      />
    );

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  test("Renders all data rows correctly using test data.", () => {
    render(
      <AdminTable<dataType>
        data={data}
        columns={columns}
        onClickToEditHandler={jest.fn()}
        onClickToDeleteHandler={jest.fn()}
      />
    );

    const rows = screen.getAllByRole("row");

    //* 由於 header 也會是一行，所以這邊的 length 會 +1
    expect(rows).toHaveLength(data.length + 1);

    rows.slice(1).forEach((rowElement, index) => {
      const rowData = data[index];
      const { getByText } = within(rowElement);

      expect(getByText(rowData.id.toString())).toBeInTheDocument();
      expect(getByText(rowData.name)).toBeInTheDocument();
      expect(getByText(rowData.age.toString())).toBeInTheDocument();
      expect(getByText(rowData.gender)).toBeInTheDocument();
    });
  });
});
