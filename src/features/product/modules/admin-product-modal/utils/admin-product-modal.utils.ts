import { v4 as uuidv4 } from "uuid";

import type {
  ProductEditDataReqDTO,
  ProductCreateDataReqDTO,
  AdminProductDto,
} from "@/features/product/DTOs/adminProduct.dtos";
import type { AdminProductForCreate } from "@/features/product/types/admin-product.types";

export const mapToProductForm = (data: AdminProductDto) => ({
  ...data,
  category: data.category.id,
  gender: data.gender.id,
  features: data.features.map((feature) => ({
    id: uuidv4(),
    feature,
  })),
  img_urls: data.img_urls.map((url) => ({ id: uuidv4(), url: url })),
});

export const mapToEditProductDTO = (
  id: string,
  data: AdminProductForCreate
): ProductEditDataReqDTO => ({
  _id: id,
  gender: data.gender,
  category: data.category,
  name: data.name,
  features: data.features.map((feature) => feature.feature),
  description: data.description,
  img_urls: data.img_urls.map((url) => url.url).filter((url) => url !== ""),
});

export const mapToCreateProductDTO = (
  data: AdminProductForCreate
): ProductCreateDataReqDTO => ({
  gender: data.gender,
  category: data.category,
  name: data.name,
  features: data.features.map((feature) => feature.feature),
  description: data.description,
  img_urls: data.img_urls.map((url) => url.url).filter((url) => url !== ""),
});
