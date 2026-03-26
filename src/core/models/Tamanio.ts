export interface Tamanio {
  id: string;
  name: string;  
}

export interface TamaniosResponse {
  success: boolean;
  data: Tamanio[];
  count: number;
}
