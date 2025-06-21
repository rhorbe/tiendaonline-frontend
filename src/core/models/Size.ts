export interface Size {
  id: string;
  name: string;  
}

export interface SizesResponse {
  success: boolean;
  data: Size[];
  count: number;
}
