import type { FORM_OPERATION_OPTIONS } from "../../../shared/types";
import type { AdminProductDto } from "../DTOs/adminProduct.dtos";

export type ProductEditModalType = {
  isOpen: boolean;
  type: FORM_OPERATION_OPTIONS;
  targetData: AdminProductDto | null;
};

export interface AdminProductForCreate {
  name: string;
  gender: string;
  category: string;
  features: { id: string; feature: string }[];
  description: string;
  img_urls: { id: string; url: string }[];
}
