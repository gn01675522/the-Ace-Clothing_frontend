import type { PaginationType } from "./types";

export interface UserBasicInfo {
  name: string;
  email: string;
  tel: string;
  address: string;
}

export interface IGeneralResponse {
  success: boolean;
  pagination: PaginationType;
  messages: string[];
}
