import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test.utils";

import { ProductCard } from "../../components/product-card/ProductCard.component";

import { PRODUCT_CATEGORIES } from "../../../../shared/types";

import { mockProductCardDefaultData } from "../../__mocks__/components.mocks";

describe("ProductCard test suite.", () => {
  //todo 等待後端完成之後再開啟測試
  // test("Should render correct icon when isFavorite is true.", () => {
  //   renderWithProviders(
  //     <ProductCard
  //       product={mockProductCardDefaultData}
  //       urlParam={PRODUCT_CATEGORIES.hats}
  //     />
  //   );
  //   const redHeartIconElement = screen.getByLabelText(/red heart icon/i);
  //   const whiteHeartIconElement = screen.queryByLabelText(/white heart icon/i);
  //   expect(redHeartIconElement).toBeInTheDocument();
  //   expect(whiteHeartIconElement).not.toBeInTheDocument();
  // });

  // test("Should render correct icon when isFavorite is false.", () => {
  //   renderWithProviders(
  //     <ProductCard
  //       product={mockProductCardDefaultData}
  //       urlParam={PRODUCT_CATEGORIES.hats}
  //     />
  //   );
  //   const redHeartIconElement = screen.queryByLabelText(/red heart icon/i);
  //   const whiteHeartIconElement = screen.getByLabelText(/white heart icon/i);
  //   expect(redHeartIconElement).not.toBeInTheDocument();
  //   expect(whiteHeartIconElement).toBeInTheDocument();
  // });

  test("Should render product details correctly.", () => {
    renderWithProviders(<ProductCard product={mockProductCardDefaultData} />);

    const imgAltTextElement = screen.getByAltText(
      `product in ${mockProductCardDefaultData.category}: ${mockProductCardDefaultData.title}`
    );
    const titleElement = screen.getByText(mockProductCardDefaultData.title);
    const priceElement = screen.getByText(/NT\$/i);
    const linkElement = screen.getByRole("link");

    expect(imgAltTextElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `/${mockProductCardDefaultData.category}/${mockProductCardDefaultData.id}`
    );
  });
});
