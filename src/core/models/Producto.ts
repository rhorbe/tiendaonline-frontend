import {VarianteProducto} from "@/core/models/VarianteProducto.ts";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  image_id: string | null;
  image_url: string | null;
  categoria: string;
  marca: string;
  variante: VarianteProducto[];
  activo: boolean;
  destacado: boolean;
  nuevo:boolean;
  oferta: boolean;
  valoracion: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Producto[];
  count: number;
}
