export interface CartItems {
  id: string;
  coupon: {
    code: string;
    due_date: number;
    id: string;
    is_enabled: 1 | 0;
    percent: number;
    title: string;
  };
  final_total: number;
  product: {
    category: string;
    content: string;
    description: string;
    id: string;
    imageUrl: string;
    imagesUrl: string[];
    is_enabled: 1 | 0;
    num: number;
    origin_price: number;
    price: number;
    title: string;
    unit: string;
  };
  product_id: string;
  qty: number;
  total: number;
}

export interface Cart {
  carts: CartItems[];
  total: number;
  final_total: number;
}

export interface CartItemAddToCart {
  product_id: string;
  qty: number;
}
