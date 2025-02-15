import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";

import ProductModal from "../ProductModal.component";
import type { AdminProduct } from "store/adminProduct/adminProduct.types";

describe("ProductModal test suite.", () => {
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
  } as AdminProduct;

  beforeEach(() => onClick.mockClear());

  test("Should trigger the closeAction callback when Clicking on the 'x', '儲存', '關閉' buttons.", () => {
    renderWithProviders(
      <ProductModal
        createOrEdit="edit"
        targetData={productData}
        closeAction={onClick}
      />
    );
    const closeButtonElement = screen.getByText(/關閉/i);
    const saveButtonElement = screen.getByText(/儲存/i);
    const closeXButtonElement = screen.getByLabelText(/Close/i);

    fireEvent.click(closeButtonElement);
    fireEvent.click(saveButtonElement);
    fireEvent.click(closeXButtonElement);

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  test("Should disable the '儲存' button when nothing passed.", () => {
    renderWithProviders(
      <ProductModal
        createOrEdit="create"
        targetData={null}
        closeAction={onClick}
      />
    );

    const saveButtonElement = screen.getByText(/儲存/i);

    fireEvent.click(saveButtonElement);

    expect(onClick).not.toHaveBeenCalledTimes(1);
  });

  test("Should render correctly in create mode.", () => {
    renderWithProviders(
      <ProductModal
        createOrEdit="create"
        targetData={null}
        closeAction={onClick}
      />
    );

    const saveElement = screen.getByText(/建立新商品/i);

    expect(saveElement).toBeInTheDocument();
  });

  test("Should render correctly in edit mode.", () => {
    renderWithProviders(
      <ProductModal
        createOrEdit="edit"
        targetData={productData}
        closeAction={onClick}
      />
    );

    const titleElement = screen.getByText(`產品名稱：${productData.title}`);
    const categoryElement = screen.getByDisplayValue(productData.category);
    const unitElement = screen.getByDisplayValue(productData.unit);
    const originPriceElement = screen.getByDisplayValue(`${productData.origin_price}`);
    const priceElement = screen.getByDisplayValue(`${productData.price}`);
    const descriptionElement = screen.getByDisplayValue(productData.description);
    const contentElement = screen.getByDisplayValue(productData.content);
    const isEnabledButtonElement = screen.getByLabelText("是否啟用");

    expect(titleElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(unitElement).toBeInTheDocument();
    expect(originPriceElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(isEnabledButtonElement).toBeChecked();
  });
});
