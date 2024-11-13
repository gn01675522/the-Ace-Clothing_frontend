export type Product = {
  id: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: 1 | 0;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
};

export type ProductWithId = {
  success: boolean;
  product: Product;
};

export type UserProducts = {
  success: boolean;
  products: Product[];
  messages: string[];
};
