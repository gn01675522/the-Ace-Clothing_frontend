import type { CartItems } from "../DTOs/cart.dtos";

export const mockCartItems: CartItems[] = [
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
