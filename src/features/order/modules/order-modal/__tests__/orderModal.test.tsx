import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../../utils/test.utils";

import { OrderModal } from "../OrderModal.module";

import type { Order } from "../../../DTOs/adminOrders.dtos";

const mockUseAdminOrderContext = jest.fn();
jest.mock("../../../hooks/admin-order.hooks", () => ({
  useAdminOrderContext: () => mockUseAdminOrderContext(),
}));

describe("OrderModal test suite.", () => {
  const orderData = {
    title: "test order",
    create_at: 1736553600000,
    id: "test id",
    is_paid: true,
    message: "",
    products: [
      {
        id: "test product",
        product_id: "test product id",
        qty: 2,
        coupon: {
          id: "test coupon id",
          title: "test coupon title",
          is_enabled: 1,
          percent: 80,
          due_date: 1736553600000,
          code: "test coupon code",
          num: 2,
        },
        final_total: 1600,
        product: {
          id: "test product id",
          category: "shoe",
          content: "test content",
          description: "test description",
          imageUrl: "https://test.com",
          imagesUrl: ["https://test1.com", "https://test2.com"],
          is_enabled: 1,
          num: 3,
          origin_price: 2000,
          price: 1800,
          title: "test title",
          unit: "unit",
        },
        total: 2000,
      },
    ],
    status: 1,
    total: 1600,
    user: {
      address: "test address",
      email: "test@test.com",
      name: "test",
      tel: "1112223344",
    },
  } as Order;

  const onClick = jest.fn();

  beforeEach(() => onClick.mockClear());

  test("Should render order data correctly.", () => {
    const mockSwitchModalOpen = jest.fn();
    const mockSubmitForm = jest.fn();
    mockUseAdminOrderContext.mockReturnValue({
      formControl: {
        targetData: orderData,
        formData: orderData,
        onChangeHandler: jest.fn(),
        submitForm: mockSubmitForm,
      },
      stateFetch: { isLoading: false },
      modalControl: { switchAdminOrderModalOpen: mockSwitchModalOpen },
    });
    renderWithProviders(<OrderModal />);
    const emailElement = screen.getByText(orderData.user.email);
    const nameElement = screen.getByText(orderData.user.name);
    const addressElement = screen.getByText(orderData.user.address);
    const isPaidInputElement = screen.getByLabelText(
      `付款狀態 (${orderData.is_paid ? "已付款" : "未付款"})`
    );
    const deliveryStateElement = screen.getByText(
      orderData.status === 0
        ? "未確認"
        : orderData.status === 1
        ? "已確認"
        : orderData.status === 2
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
    const mockSwitchModalOpen = jest.fn();
    const mockSetIsModalOpen = jest.fn();
    const mockSubmitForm = jest.fn();
    mockUseAdminOrderContext.mockReturnValue({
      formControl: {
        targetData: orderData,
        onChangeHandler: jest.fn(),
        submitForm: mockSubmitForm,
      },
      stateFetch: { isLoading: false },
      modalControl: {
        switchAdminOrderModalOpen: mockSwitchModalOpen,
        setIsModalOpen: mockSetIsModalOpen,
      },
    });
    renderWithProviders(<OrderModal />);
    const closeButton = screen.getByText(/關閉/i);
    const saveButton = screen.getByText(/儲存/i);
    const closeXButton = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButton);
    fireEvent.click(saveButton);
    fireEvent.click(closeXButton);

    expect(mockSwitchModalOpen).toHaveBeenCalledTimes(3);
  });
});
