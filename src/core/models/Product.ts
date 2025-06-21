export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  brand_id: string;
  size_id: string;
  image_id: string | null;
  image_url: string | null;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  count: number;
}
