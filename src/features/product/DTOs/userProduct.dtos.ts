import { APIResponseWithoutData } from "../../../shared/types";

export type UserProductsDto = {
  id: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: 1 | 0;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
};

export interface FetchUserProductsResDto extends APIResponseWithoutData {
  products: UserProductsDto[];
}
