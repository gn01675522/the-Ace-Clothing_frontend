import type { UserProductsDto } from "../DTOs/userProduct.dtos";

export const mockProductCardDefaultData = {
  id: "test id",
  category: "hat",
  content: "test content",
  description: "test description",
  imageUrl: "https://test.com",
  imagesUrl: ["https://test1.com", "https://test2.com"],
  is_enabled: 1,
  num: 3,
  origin_price: 2000,
  price: 2000,
  title: "test hat",
  unit: "unit",
} as UserProductsDto;
