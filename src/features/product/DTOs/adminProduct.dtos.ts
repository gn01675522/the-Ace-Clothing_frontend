import { APIResDTO } from "@/shared/DTOs/api.dtos";
import { PaginationType } from "../../../shared/types";

export interface AdminProductDto {
  _id: string;
  gender: { id: string; value: string };
  category: { id: string; value: string };
  name: string;
  features: string[];
  description: string;
  img_urls: string[];
  recycled: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface FetchAdminProductsResDto extends APIResDTO {
  data: AdminProductDto[];
  pagination: PaginationType;
}

export type ProductEditDataReqDTO = Omit<
  AdminProductDto,
  "createdAt" | "updatedAt" | "__v" | "gender" | "category" | "recycled"
> & { gender: string; category: string };

export type ProductCreateDataReqDTO = Omit<
  AdminProductDto,
  "_id" | "createdAt" | "updatedAt" | "__v" | "gender" | "category" | "recycled"
> & { gender: string; category: string };
