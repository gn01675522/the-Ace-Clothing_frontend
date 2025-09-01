import type { AdminOrderDto } from "../DTOs/adminOrders.dtos";

export const mockOrderData = {
  title: "test order",
  create_at: 1736553600000,
  id: "test id",
  is_paid: true,
  message: "",
  products: [
    {
      id: "test product",
      product_id: "test product id",
      qty: 2,
      coupon: {
        id: "test coupon id",
        title: "test coupon title",
        is_enabled: 1,
        percent: 80,
        due_date: 1736553600000,
        code: "test coupon code",
        num: 2,
      },
      final_total: 1600,
      product: {
        id: "test product id",
        category: "shoe",
        content: "test content",
        description: "test description",
        imageUrl: "https://test.com",
        imagesUrl: ["https://test1.com", "https://test2.com"],
        is_enabled: 1,
        num: 3,
        origin_price: 2000,
        price: 1800,
        title: "test title",
        unit: "unit",
      },
      total: 2000,
    },
  ],
  status: 1,
  total: 1600,
  user: {
    address: "test address",
    email: "test@test.com",
    name: "test",
    tel: "1112223344",
  },
} as AdminOrderDto;
