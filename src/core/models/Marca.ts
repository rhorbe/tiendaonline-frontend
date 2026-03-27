export interface Marca {
  id: string;
  name: string;  
}

export interface BrandsResponse {
  success: boolean;
  data: Marca[];
  count: number;
}
