export interface VarianteProducto {
  id: string;
  producto_id: string;
  sku: string;
  precio: string;
  stock: number;
  activa: boolean;
  tamanio?: {
    id: string;
    nombre: string;
  };
  tamano?: string;
}