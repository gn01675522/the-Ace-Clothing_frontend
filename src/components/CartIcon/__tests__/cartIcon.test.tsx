import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.utils";

import CartIcon from "../CartIcon.component";

import { INITIAL_STATE } from "../../../store/cart/cart.slice";

import type { CartItems } from "../../../store/cart/cart.types";

describe("Cart Icon test suite.", () => {
  test("Renders only the cart icon when the cart is empty.", () => {
    const initialCartItems: CartItems[] = [];

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
    const initialCartItems: CartItems[] = [
      {
        id: "test1",
        coupon: {
          code: "test2",
          due_date: 100,
          id: "test_code",
          is_enabled: 1,
          percent: 20,
          title: "testCode",
          num: 1,
        },
        final_total: 1500,
        product: {
          category: "men",
          content: "test",
          description: "for test",
          id: "test_1",
          imageUrl: "https://test.com",
          imagesUrl: [],
          is_enabled: 1,
          num: 5,
          origin_price: 5,
          price: 5,
          title: "just for test",
          unit: "test",
        },
        product_id: "test_product_1",
        qty: 5,
        total: 2000,
      },
    ];

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

    const getItemNumberOnIcon = screen.getByText(
      initialCartItems.length.toString()
    );
    expect(getItemNumberOnIcon).toBeInTheDocument();
  });
});
