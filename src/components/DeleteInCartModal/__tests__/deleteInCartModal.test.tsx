import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";

import DeleteInCartModal from "../DeleteInCartModal.component";

describe("DeleteInCartModal test suite.", () => {
  test("Clicking on the '確定刪除', '取消刪除' buttons triggers the backdropClose callback.", async () => {
    const onClick = jest.fn();

    renderWithProviders(<DeleteInCartModal backdropClose={onClick} />);

    const confirmDeleteButton = screen.getByText(/確定刪除/i);
    const cancelDeleteButton = screen.getByText(/取消刪除/i);

    await fireEvent.click(confirmDeleteButton);
    await fireEvent.click(cancelDeleteButton);

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
