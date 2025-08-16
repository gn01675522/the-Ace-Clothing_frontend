import { render, screen } from "@testing-library/react";

import { PriceTag } from "../PriceTag.component";

import { formatNumberWithCommas } from "../../../utils/common.utils";

describe("PriceTag test suite.", () => {
  test("Should render correctly when price is lower than original price.", () => {
    const origin_price = 1000;
    const price = 900;

    render(<PriceTag origin_price={origin_price} price={price} />);

    const priceElement = screen.getByText(
      `NT$ ${formatNumberWithCommas(price)}`
    );
    const originPriceElement = screen.getByText(
      `NT$ ${formatNumberWithCommas(origin_price)}`
    );

    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price-tag__sell-price");
    expect(originPriceElement).toBeInTheDocument();
    expect(originPriceElement).toHaveClass("price-tag__origin-price");
    expect(originPriceElement).toHaveClass("product-on-sale");
  });
  test("Should render correctly when the price is equal to the original price.", () => {
    const origin_price = 1000;
    const price = 1000;

    render(<PriceTag origin_price={origin_price} price={price} />);

    const priceElement = screen.queryByText(
      `NT$ ${formatNumberWithCommas(price)}`,
      {
        selector: ".price-tag__sell-price",
      }
    );

    const originPriceElement = screen.getByText(
      `NT$ ${formatNumberWithCommas(origin_price)}`,
      {
        selector: ".price-tag__origin-price",
      }
    );
    expect(priceElement).toBeNull();
    expect(originPriceElement).toBeInTheDocument();
    expect(originPriceElement).not.toHaveClass("product-on-sale");
  });
});
