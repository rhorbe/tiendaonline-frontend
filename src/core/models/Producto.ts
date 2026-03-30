export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria_id: string;
  marca_id: string;
  tamanio_id: string;
  valoracion: number;
  image_id: string | null;
  image_url: string | null;
}

export interface ProductsResponse {
  success: boolean;
  data: Producto[];
  count: number;
}
