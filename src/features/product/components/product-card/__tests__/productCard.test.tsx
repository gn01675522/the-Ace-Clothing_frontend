import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../../utils/test.utils";

import { ProductCard } from "../ProductCard.component";

import { PRODUCT_CATEGORIES } from "../../../../../shared/types";

import type { Product } from "features/product/DTOs/userProduct.dtos";

describe("ProductCard test suite.", () => {
  const product = {
    id: "test id",
    category: "hat",
    content: "test content",
    description: "test description",
    imageUrl: "https://test.com",
    imagesUrl: ["https://test1.com", "https://test2.com"],
    is_enabled: 1,
    num: 3,
    origin_price: 2000,
    price: 2000,
    title: "test hat",
    unit: "unit",
  } as Product;

  test("Should render correct icon when isFavorite is true.", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        urlParam={PRODUCT_CATEGORIES.hats}
        isFavorite={true}
      />
    );
    const redHeartIconElement = screen.getByLabelText(/red heart icon/i);
    const whiteHeartIconElement = screen.queryByLabelText(/white heart icon/i);
    expect(redHeartIconElement).toBeInTheDocument();
    expect(whiteHeartIconElement).not.toBeInTheDocument();
  });

  test("Should render correct icon when isFavorite is false.", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        urlParam={PRODUCT_CATEGORIES.hats}
        isFavorite={false}
      />
    );
    const redHeartIconElement = screen.queryByLabelText(/red heart icon/i);
    const whiteHeartIconElement = screen.getByLabelText(/white heart icon/i);
    expect(redHeartIconElement).not.toBeInTheDocument();
    expect(whiteHeartIconElement).toBeInTheDocument();
  });

  test("Should render product details correctly.", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        urlParam={PRODUCT_CATEGORIES.hats}
        isFavorite={false}
      />
    );

    const imgAltTextElement = screen.getByAltText(
      `product in ${PRODUCT_CATEGORIES.hats}: ${product.title}`
    );
    const titleElement = screen.getByText(product.title);
    const priceElement = screen.getByText(/NT\$/i);
    const linkElement = screen.getByRole("link");

    expect(imgAltTextElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `/${PRODUCT_CATEGORIES.hats}/${product.id}`
    );
  });
});
