export interface Brand {
  id: string;
  name: string;  
}

export interface BrandsResponse {
  success: boolean;
  data: Brand[];
  count: number;
}
