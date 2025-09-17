import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";

import { DeleteModal } from "../delete-modal/DeleteModal.module";

describe("DeleteModal test suite.", () => {
  test("Clicking on the 'ｘ', '取消', '確認刪除' buttons triggers the closeAction callback.", () => {
    const mockOnClose = jest.fn();
    const mockOnDelete = jest.fn();

    renderWithProviders(
      <DeleteModal
        id="test"
        title="test title"
        actionControl={{
          closeAction: mockOnClose,
          deleteAction: mockOnDelete,
        }}
      />
    );

    const closeButton = screen.getByText(/取消/i);
    const closeXButton = screen.getByLabelText(/Close/i);
    const confirmDeleteButton = screen.getByText(/確認刪除/i);

    fireEvent.click(closeButton);
    fireEvent.click(closeXButton);
    fireEvent.click(confirmDeleteButton);

    expect(mockOnClose).toHaveBeenCalledTimes(3);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
  test("Should display title when passed title prop.", () => {
    const mockOnClose = jest.fn();
    const mockOnDelete = jest.fn();

    const title = "test title";

    renderWithProviders(
      <DeleteModal
        id="test"
        title={title}
        actionControl={{
          closeAction: mockOnClose,
          deleteAction: mockOnDelete,
        }}
      />
    );

    const titleElement = screen.getByText(`確定刪除 ${title}？`);

    expect(titleElement).toBeInTheDocument();
  });
});
