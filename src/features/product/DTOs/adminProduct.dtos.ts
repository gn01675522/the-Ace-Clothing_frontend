import { APIResponseWithoutData } from "../../../shared/types";

export interface AdminProductDto {
  id: string;
  category: string;
  content: string;
  description: string;
  is_enabled: 1 | 0;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  imageUrl: string;
  imagesUrl: string[];
}

export type CreateProductDto = Omit<AdminProductDto, "id">;

export interface FetchAdminProductsResDto extends APIResponseWithoutData {
  products: { [key: string]: AdminProductDto };
}
