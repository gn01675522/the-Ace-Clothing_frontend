import { render, screen } from "@testing-library/react";

import { OrderCard } from "../../components/order-card/OrderCard.component";

import { formatNumberWithCommas } from "../../../../utils/common.utils";

import { mockOrderCardProductsList } from "../../__mocks__/components.mocks";

describe("OrderCard test suite.", () => {
  test("Should render order data info correcly.", () => {
    render(<OrderCard {...mockOrderCardProductsList} />);

    const imgElement = screen.getByAltText(
      `order product: ${mockOrderCardProductsList.title}`
    );
    const productInfoElement = screen.getByText(
      `${mockOrderCardProductsList.title} x ${mockOrderCardProductsList.qty}`
    );
    const priceElement = screen.getByText(
      `NT$ ${formatNumberWithCommas(
        Math.round(mockOrderCardProductsList.final_total)
      )}`
    );
    expect(imgElement).toHaveAttribute(
      "src",
      mockOrderCardProductsList.imageUrl
    );
    expect(productInfoElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });
});
