import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/test.utils";

import { CartIcon } from "../../components/cart-icon/CartIcon.component";
import { mockCartItems } from "../../__mocks__/components.mocks";

import { INITIAL_STATE } from "../../store/cart.slice";

import type { CartItemDto } from "../../DTOs/cart.dtos";

describe("Cart Icon test suite.", () => {
  test("Renders only the cart icon when the cart is empty.", () => {
    const initialCartItems: CartItemDto[] = [];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          ...INITIAL_STATE,
          cart: {
            carts: initialCartItems,
            total: 1,
            final_total: 1,
          },
        },
      },
    });

    const cartIcon = screen.getByLabelText("cart link");
    expect(cartIcon).toBeInTheDocument();

    const itemCount = screen.queryByText("0");
    expect(itemCount).not.toBeInTheDocument();

    const cartLogo = cartIcon.querySelector(".cart-icon__count");
    expect(cartLogo).not.toBeInTheDocument();
  });
  test("Renders CartIcon with preloaded state and displays the correct item number.", () => {
    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          ...INITIAL_STATE,
          cart: {
            carts: mockCartItems,
            total: 1,
            final_total: 1,
          },
        },
      },
    });

    const getItemNumberOnIcon = screen.getByText(
      mockCartItems.length.toString()
    );
    expect(getItemNumberOnIcon).toBeInTheDocument();
  });
});
