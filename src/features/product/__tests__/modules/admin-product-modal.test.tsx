import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test.utils";

import { AdminProductModal } from "../../modules/admin-product-modal/AdminProductModal.module";
import { FORM_OPERATION_OPTIONS } from "../../../../shared/types";
import type { AdminProductDto } from "../../DTOs/adminProduct.dtos";
import type { AdminProductForCreate } from "../../types/admin-product.types";

const mockUseProductManagementContext = jest.fn();
jest.mock("../hooks/admin-product-modal.hooks", () => ({
  useProductManagementContext: () => mockUseProductManagementContext(),
}));

const mockDefaultFormData: AdminProductForCreate = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  num: 0,
  description: "",
  content: "",
  is_enabled: 0,
  imageUrl: "",
  imagesUrl: [],
};

describe("AdminProductModal test suite.", () => {
  const onClick = jest.fn();
  const productData = {
    id: "test id",
    title: "test title",
    category: "hat",
    origin_price: 2000,
    price: 1000,
    unit: "unit",
    num: 3,
    description: "test description",
    content: "test content",
    is_enabled: 1,
    imageUrl: "https://test.com",
    imagesUrl: ["https://test1.com", "https://test2.com"],
  } as AdminProductDto;

  beforeEach(() => onClick.mockClear());

  test("Should trigger the closeAction callback when Clicking on the 'x', '儲存', '關閉' buttons.", () => {
    const mockSwitchModalOpen = jest.fn();
    const mockSubmitForm = jest.fn();

    mockUseProductManagementContext.mockReturnValue({
      category: "mens",
      formControl: {
        targetData: productData,
        type: FORM_OPERATION_OPTIONS.create,
        onChangeHandler: jest.fn(),
        submitForm: mockSubmitForm,
      },
      modalControl: { switchAdminProductModalOpen: mockSwitchModalOpen },
    });

    renderWithProviders(<AdminProductModal />);
    const closeButtonElement = screen.getByText(/關閉/i);
    const closeXButtonElement = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButtonElement);
    fireEvent.click(closeXButtonElement);

    expect(mockSwitchModalOpen).toHaveBeenCalledTimes(2);
  });

  // test("Should disable the '儲存' button when nothing passed.", () => {
  //   const mockSwitchModalOpen = jest.fn();
  //   mockUseProductManagementContext.mockReturnValue({
  //     category: "mens",
  //     formControl: {
  //       submitForm: jest.fn(),
  //       onChangeHandler: jest.fn(),
  //       targetData: null,
  //       formData: mockDefaultFormData,
  //       type: FORM_OPERATION_OPTIONS.create,
  //     },
  //     modalControl: { switchAdminProductModalOpen: mockSwitchModalOpen },
  //   });
  //   renderWithProviders(<AdminProductModal />);

  //   const saveButtonElement = screen.getByText(/儲存/i);

  //   fireEvent.click(saveButtonElement);

  //   expect(mockSwitchModalOpen).not.toHaveBeenCalled();
  // });

  // test("Should render correctly in create mode.", () => {
  //   const mockSwitchModalOpen = jest.fn();
  //   mockUseProductManagementContext.mockReturnValue({
  //     category: "mens",
  //     formControl: {
  //       targetData: productData,
  //       formData: productData,
  //       onChangeHandler: jest.fn(),
  //       type: FORM_OPERATION_OPTIONS.create,
  //     },
  //     modalControl: { switchAdminProductModalOpen: mockSwitchModalOpen },
  //   });
  //   renderWithProviders(<AdminProductModal />);

  //   const saveElement = screen.getByText(/建立新商品/i);

  //   expect(saveElement).toBeInTheDocument();
  // });

  // test("Should render correctly in edit mode.", () => {
  //   const mockSwitchModalOpen = jest.fn();
  //   mockUseProductManagementContext.mockReturnValue({
  //     category: "mens",
  //     formControl: {
  //       targetData: productData,
  //       formData: productData,
  //       onChangeHandler: jest.fn(),
  //       type: FORM_OPERATION_OPTIONS.edit,
  //     },
  //     modalControl: { switchAdminProductModalOpen: mockSwitchModalOpen },
  //   });
  //   renderWithProviders(<AdminProductModal />);

  //   const titleElement = screen.getByText(`產品名稱：${productData.title}`);
  //   const categoryElement = screen.getByDisplayValue(productData.category);
  //   const unitElement = screen.getByDisplayValue(productData.unit);
  //   const originPriceElement = screen.getByDisplayValue(
  //     `${productData.origin_price}`
  //   );
  //   const priceElement = screen.getByDisplayValue(`${productData.price}`);
  //   const descriptionElement = screen.getByDisplayValue(
  //     productData.description
  //   );
  //   const contentElement = screen.getByDisplayValue(productData.content);

  //   expect(titleElement).toBeInTheDocument();
  //   expect(categoryElement).toBeInTheDocument();
  //   expect(unitElement).toBeInTheDocument();
  //   expect(originPriceElement).toBeInTheDocument();
  //   expect(priceElement).toBeInTheDocument();
  //   expect(descriptionElement).toBeInTheDocument();
  //   expect(contentElement).toBeInTheDocument();
  // });
});
