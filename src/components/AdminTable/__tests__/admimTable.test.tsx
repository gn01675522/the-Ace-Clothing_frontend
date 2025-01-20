import { screen, render } from "@testing-library/react";
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
  { header: "name", accessor: "name" },
  { header: "age", accessor: "age" },
  { header: "gender", accessor: "gender" },
] as { header: string; accessor: keyof dataType }[];

describe("admin table tests", () => {
  test("should call onClickToEdit and onClickToDelete with correct arguments when buttons are clicked", async () => {
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

  test("should render all headers correctly", () => {
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

  test("should render all data rows correctly", () => {
    render(
      <AdminTable<dataType>
        data={data}
        columns={columns}
        onClickToEditHandler={jest.fn()}
        onClickToDeleteHandler={jest.fn()}
      />
    );

    data.forEach((row) => {
      expect(screen.getByText(row.id)).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age)).toBeInTheDocument();
      expect(screen.getByText(row.gender)).toBeInTheDocument();
    });
  });
});
