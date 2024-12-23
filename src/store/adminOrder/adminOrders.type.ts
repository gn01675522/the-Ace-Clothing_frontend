import type { Pagination } from "../../shared/types/types";

export interface Order {
  title: string;
  create_at: number;
  id: string;
  is_paid: boolean;
  message: string;
  products: [
    {
      id: string;
      product_id: string;
      qty: string;
    }
  ];
  status: number;
  total: number;
  user: {
    address: string;
    email: string;
    name: string;
    tel: string;
  };
}

export interface AdminOrder {
  success: boolean;
  orders: Order[];
  pagination: Pagination;
  messages: string[];
}
