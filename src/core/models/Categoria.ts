export interface Categoria {
  id: string;
  nombre: string;
}

export interface CategoriasResponse {
  success: boolean;
  data: Categoria[];
  count: number;
}
