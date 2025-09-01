import type { AdminProductForCreate } from "../types/admin-product.types";
import type { AdminProductDto } from "../DTOs/adminProduct.dtos";

export const mockAdminProductModalFormDefaultData: AdminProductForCreate = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  num: 0,
  description: "",
  content: "",
  is_enabled: 0,
  imageUrl: "",
  imagesUrl: [],
};

export const mockProductData = {
  id: "test id",
  title: "test title",
  category: "hat",
  origin_price: 2000,
  price: 1000,
  unit: "unit",
  num: 3,
  description: "test description",
  content: "test content",
  is_enabled: 1,
  imageUrl: "https://test.com",
  imagesUrl: ["https://test1.com", "https://test2.com"],
} as AdminProductDto;
