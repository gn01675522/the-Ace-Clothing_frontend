export interface IGetAdminProduct {
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
}

export interface AdminProductRes {
  success: boolean;
  products: {
    [key: string]: IGetAdminProduct;
  };
}
