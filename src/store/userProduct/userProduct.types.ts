export type Product = {
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

export type ProductById = {
  success: boolean;
  product: Product;
};

export type UserProducts = {
  success: boolean;
  products: Product[];
  messages: string[];
};
