import type { FORM_OPERATION_OPTIONS } from "../../../shared/types";
import type { IGetAdminProduct } from "../DTOs/adminProduct.types";

export type ProductEditModalType = {
  isOpen: boolean;
  type: FORM_OPERATION_OPTIONS;
  targetData: IGetAdminProduct | null;
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
  is_enabled: number;
  imageUrl: string;
  imagesUrl: string[];
}
