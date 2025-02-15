import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";

import DeleteModal from "../DeleteModal.component";

import { DELETE_MODAL_TYPE } from "../DeleteModal.component";

describe("DeleteModal test suite.", () => {
  test("Clicking on the 'ｘ', '取消', '確認刪除' buttons triggers the closeAction callback.", () => {
    const onClick = jest.fn();
    renderWithProviders(
      <DeleteModal
        dataType={DELETE_MODAL_TYPE.adminCoupon}
        id="test"
        title="test title"
        closeAction={onClick}
      />
    );

    const closeButton = screen.getByText(/取消/i);
    const closeXButton = screen.getByLabelText(/Close/i);
    const confirmDeleteButton = screen.getByText(/確認刪除/i);

    fireEvent.click(closeButton);
    fireEvent.click(closeXButton);
    fireEvent.click(confirmDeleteButton);

    expect(onClick).toHaveBeenCalledTimes(3);
  });
  test("Should display title when passed title prop.", () => {
    const title = "test title";

    renderWithProviders(
      <DeleteModal
        dataType={DELETE_MODAL_TYPE.adminCoupon}
        id="test"
        title={title}
        closeAction={() => {}}
      />
    );

    const titleElement = screen.getByText(`確定刪除 ${title}？`);

    expect(titleElement).toBeInTheDocument();
  });
});
