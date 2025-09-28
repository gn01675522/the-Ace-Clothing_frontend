import type { APIResDTO } from "./api.dtos";

export interface ProductCategoryDTO {
  name: string;
  parent: string | null;
  createdAt: Date;
  updatedAt: Date;
  recycled: boolean;
  _id: string;
  __v: number;
}

export interface GenderDTO {
  createdAt: Date;
  name: "male" | "female" | "neutral";
  updatedAt: Date;
  recycled: false;
  _id: string;
  __v: number;
}

export interface ProductCategoryResDTO extends APIResDTO {
  data: ProductCategoryDTO[];
  total: number;
}

export interface GenderResDTO extends APIResDTO {
  data: GenderDTO[];
  total: number;
}
