import type { PaginationType } from "./types";
import type { AxiosResponse, AxiosError } from "axios";

export interface UserBasicInfo {
  name: string;
  email: string;
  tel: string;
  address: string;
}

export interface APIResponseWithoutData {
  success: boolean;
  pagination: PaginationType;
  messages: string[];
}

export interface APIGeneralResDto {
  success: boolean;
  message: string;
}

export interface APIResponse<T> extends AxiosResponse {
  data: T;
}

export type APIRejectResponse = AxiosError<APIGeneralResDto>;
