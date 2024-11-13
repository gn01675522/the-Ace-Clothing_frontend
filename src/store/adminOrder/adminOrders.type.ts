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

export interface Test {
  data: {
    create_at: 1523539519;
    is_paid: false;
    message: "這是留言";
    products: {
      L8nBrq8Ym4ARI1Kog4t: {
        id: "L8nBrq8Ym4ARI1Kog4t";
        product_id: "-L8moRfPlDZZ2e-1ritQ";
        qty: "3";
      };
    };
    user: {
      address: "kaohsiung";
      email: "test@gmail.com";
      name: "test";
      tel: "0912346768";
    };
    num: 2;
  };
}

export interface AdminOrder {
  success: boolean;
  orders: AdminOrder[];
  pagination: Pagination;
  messages: string[];
}
