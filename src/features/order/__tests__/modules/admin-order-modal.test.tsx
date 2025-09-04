import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test.utils";

import { AdminOrderModal } from "../../modules/admin-order-modal/AdminOrderModal.module";

import { useOrderManagementContext } from "../../modules/admin-order-modal/hooks/admin-order-modal.hooks";

import { mockOrderData } from "../../__mocks__/modules.mocks";

jest.mock("../../modules/admin-order-modal/hooks/admin-order-modal.hooks");

describe("OrderModal test suite.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onClick = jest.fn();

  beforeEach(() => onClick.mockClear());

  test("Should render order data correctly.", () => {
    (useOrderManagementContext as jest.Mock).mockReturnValue({
      formControl: {
        formData: mockOrderData,
        targetData: mockOrderData,
      },
    });

    renderWithProviders(<AdminOrderModal />);

    const emailElement = screen.getByText(mockOrderData.user.email);
    const nameElement = screen.getByText(mockOrderData.user.name);
    const addressElement = screen.getByText(mockOrderData.user.address);
    const isPaidInputElement = screen.getByLabelText(
      `付款狀態 (${mockOrderData.is_paid ? "已付款" : "未付款"})`
    );
    const deliveryStateElement = screen.getByText(
      mockOrderData.status === 0
        ? "未確認"
        : mockOrderData.status === 1
        ? "已確認"
        : mockOrderData.status === 2
        ? "外送中"
        : "已送達"
    );
    expect(emailElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(isPaidInputElement).toBeInTheDocument();
    expect(isPaidInputElement).toBeChecked();
    expect(deliveryStateElement).toBeInTheDocument();
  });
  test("Clicking on the 'x', '儲存', '關閉' buttons triggers the backdropClose callback.", () => {
    const mockOnCloseHandler = jest.fn();
    const mockOnSubmitHandler = jest.fn();
    (useOrderManagementContext as jest.Mock).mockReturnValue({
      onCloseHandler: mockOnCloseHandler,
      onSubmitHandler: mockOnSubmitHandler,
      formControl: {
        formData: mockOrderData,
        targetData: mockOrderData,
      },
    });

    renderWithProviders(<AdminOrderModal />);

    const closeButton = screen.getByText(/關閉/i);
    const saveButton = screen.getByText(/儲存/i);
    const closeXButton = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButton);
    fireEvent.click(saveButton);
    fireEvent.click(closeXButton);

    expect(mockOnCloseHandler).toHaveBeenCalledTimes(2);
    expect(mockOnSubmitHandler).toHaveBeenCalledTimes(1);
  });
});
