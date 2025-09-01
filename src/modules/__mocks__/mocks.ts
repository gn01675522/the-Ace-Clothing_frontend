export type mockTableDataTypes = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
};

export const mockTableData: mockTableDataTypes[] = [
  { id: 1, name: "Jack", age: 23, gender: "male" },
  { id: 2, name: "Susan", age: 60, gender: "female" },
  { id: 3, name: "Millie", age: 27, gender: "female" },
];

export const mockColumns = [
  { header: "id", accessor: "id" },
  { header: "name", accessor: "name" },
  { header: "age", accessor: "age" },
  { header: "gender", accessor: "gender" },
] as { header: string; accessor: keyof mockTableDataTypes }[];
