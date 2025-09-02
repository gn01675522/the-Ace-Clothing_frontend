import type { FORM_OPERATION_OPTIONS } from "../../../shared/types";
import type { AdminProductDto } from "../DTOs/adminProduct.dtos";

export type ProductEditModalType = {
  isOpen: boolean;
  type: FORM_OPERATION_OPTIONS;
  targetData: AdminProductDto | null;
};

export interface AdminProductForCreate {
  title: string;
  category: string;
  origin_price: number;
  price: number;
  num: number;
  unit: string;
  description: string;
  content: string;
  is_enabled: 0 | 1;
  imageUrl: string;
  imagesUrl: string[];
}
