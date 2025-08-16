import { render, screen } from "@testing-library/react";

import OrderCard from "../OrderCard.component";

import { formatNumberWithCommas } from "../../../../../utils/common.utils";

import type { OrderCardProductsType } from "../OrderCard.component";

const products = [
  {
    id: "test id",
    qty: 3,
    coupon: {
      id: "test coupon",
      title: "test title",
      is_enabled: 1,
      percent: 80,
      due_date: 1736553600000,
      code: "test code",
      num: 2,
    },
    final_total: 1999,
    product: {
      id: "test product",
      category: "shoe",
      content: "test content",
      description: "test description",
      imageUrl: "https://test.com",
      imagesUrl: ["https://test.com", "https://test.com"],
      is_enabled: 1,
      num: 3,
      origin_price: 2500,
      price: 1999,
      title: "test shoe",
      unit: "unit",
    },
    total: 1255,
  },
] as OrderCardProductsType[];

describe("OrderCard test suite.", () => {
  test("Should render product data info correcly.", () => {
    render(<OrderCard products={products} />);
    products.forEach((product) => {
      const imgElement = screen.getByAltText(
        `order product: ${product.product.title}`
      );
      const productInfoElement = screen.getByText(
        `${product.product.title}x${product.qty}`
      );
      const priceElement = screen.getByText(
        `NT$ ${formatNumberWithCommas(Math.round(product.final_total))}`
      );
      expect(imgElement).toHaveAttribute("src", product.product.imageUrl);
      expect(productInfoElement).toBeInTheDocument();
      expect(priceElement).toBeInTheDocument();
    });
  });
});
