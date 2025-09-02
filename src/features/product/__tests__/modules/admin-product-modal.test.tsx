import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test.utils";

import { AdminProductModal } from "../../modules/admin-product-modal/AdminProductModal.module";
import { useProductManagementContext } from "../../modules/admin-product-modal/hooks/admin-product-modal.hooks";

import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";
import {
  mockProductData,
  mockAdminProductModalFormDefaultData,
} from "../../__mocks__/modules.mocks";

jest.mock("../../modules/admin-product-modal/hooks/admin-product-modal.hooks");

describe("AdminProductModal test suite.", () => {
  const onClick = jest.fn();

  beforeEach(() => onClick.mockClear());

  test("Should trigger the closeAction callback when Clicking on the 'x', '儲存', '關閉' buttons.", () => {
    const mockOnCloseHandler = jest.fn();
    const mockOnSubmitHandler = jest.fn();
    (useProductManagementContext as jest.Mock).mockReturnValue({
      onCloseHandler: mockOnCloseHandler,
      onSubmitHandler: mockOnSubmitHandler,
      formControl: {
        formData: { id: null, form: mockAdminProductModalFormDefaultData },
        type: FORM_OPERATION_OPTIONS.create,
        isSaveToSave: true,
      },
    });

    renderWithProviders(<AdminProductModal />);
    const closeButtonElement = screen.getByText(/關閉/i);
    const saveButtonElement = screen.getByText(/儲存/i);
    const closeXButtonElement = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButtonElement);
    fireEvent.click(saveButtonElement);
    fireEvent.click(closeXButtonElement);

    expect(mockOnCloseHandler).toHaveBeenCalledTimes(2);
    expect(mockOnSubmitHandler).toHaveBeenCalledTimes(1);
  });

  test("Should disable the '儲存' button when nothing passed.", () => {
    const mockOnSubmitHandler = jest.fn();

    (useProductManagementContext as jest.Mock).mockReturnValue({
      onSubmitHandler: mockOnSubmitHandler,
      formControl: {
        formData: { id: null, form: mockAdminProductModalFormDefaultData },
        type: FORM_OPERATION_OPTIONS.create,
      },
    });

    renderWithProviders(<AdminProductModal />);

    const saveButtonElement = screen.getByText(/儲存/i);

    fireEvent.click(saveButtonElement);

    expect(mockOnSubmitHandler).not.toHaveBeenCalled();
  });

  test("Should render correctly in create mode.", () => {
    (useProductManagementContext as jest.Mock).mockReturnValue({
      formControl: {
        formData: { id: null, form: mockAdminProductModalFormDefaultData },
        type: FORM_OPERATION_OPTIONS.create,
      },
    });

    renderWithProviders(<AdminProductModal />);

    const saveElement = screen.getByText(/建立新商品/i);

    expect(saveElement).toBeInTheDocument();
  });

  test("Should render correctly in edit mode.", () => {
    (useProductManagementContext as jest.Mock).mockReturnValue({
      formControl: {
        formData: { id: mockProductData.id, form: mockProductData },
        type: FORM_OPERATION_OPTIONS.edit,
      },
    });

    renderWithProviders(<AdminProductModal />);

    const titleElement = screen.getByText(`產品名稱：${mockProductData.title}`);
    const categoryElement = screen.getByDisplayValue(mockProductData.category);
    const unitElement = screen.getByDisplayValue(mockProductData.unit);
    const originPriceElement = screen.getByDisplayValue(
      `${mockProductData.origin_price}`
    );
    const priceElement = screen.getByDisplayValue(`${mockProductData.price}`);
    const descriptionElement = screen.getByDisplayValue(
      mockProductData.description
    );
    const contentElement = screen.getByDisplayValue(mockProductData.content);

    expect(titleElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(unitElement).toBeInTheDocument();
    expect(originPriceElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});
