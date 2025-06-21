export interface Category {
  id: string;
  name: string;  
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  count: number;
}
