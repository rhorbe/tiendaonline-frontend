export interface Category {
  id: string;
  nombre: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  count: number;
}
