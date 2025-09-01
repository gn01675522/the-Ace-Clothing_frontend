import type { OrderCardProductsType } from "../components/order-card/OrderCard.component";

export const mockOrderCardProductsList = [
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

export const mockSummaryInfoData = {
  total: 2000,
  userData: {
    user: {
      name: "test",
      tel: "0000000000",
      address: "test address",
      email: "test@test.com",
    },
  },
};
