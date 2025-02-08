import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test.utils";

import CategoryCard from "../CategoryCard.component";

describe("Category card test suite.", () => {
  test("Should render CategoryCard with correct class and image src.", () => {
    const defaultData = {
      title: "女裝",
      url: "https://i.imgur.com/4fmYMgE.jpg",
      path: { user: "/womens", admin: "/admin/products/womens" },
    };

    const { container } = renderWithProviders(
      <CategoryCard category={defaultData} index={1} />
    );

    expect(container.getElementsByClassName("category-card-1"));

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultData.url);
  });
});
