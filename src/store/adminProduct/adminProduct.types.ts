export type AdminProduct = {
  id: string;
  category: string;
  content: string;
  description: string;
  is_enabled: 1 | 0;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  imageUrl: string;
  imagesUrl: string[];
};

export type AdminProductForCreate = {
  title: string;
  category: string;
  origin_price: number;
  price: number;
  num: number;
  unit: string;
  description: string;
  content: string;
  is_enabled: number;
  imageUrl: string;
  imagesUrl: string[];
};

export type AdminProductRes = {
  success: boolean;
  products: {
    [key: string]: AdminProduct;
  };
};
