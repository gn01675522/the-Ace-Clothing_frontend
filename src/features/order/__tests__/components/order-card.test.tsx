import { render, screen } from "@testing-library/react";

import { OrderCard } from "../../components/order-card/OrderCard.component";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import { mockOrderCardProductsList } from "../../__mocks__/components.mocks";

describe("OrderCard test suite.", () => {
  test("Should render product data info correcly.", () => {
    render(<OrderCard products={mockOrderCardProductsList} />);

    mockOrderCardProductsList.forEach((product) => {
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
