import api from "./axiosInstance";
import { Producto, ProductsMeta, ProductsResponse } from "../models/Producto.ts";

export interface ProductFilters {
  categoriaId?: string;
  marcaId?: string;
  destacado?: boolean;
}

export interface FetchProductsResult {
  data: Producto[];
  meta?: ProductsMeta;
}

interface ProductByIdResponse {
  success: boolean;
  data: Producto | Producto[] | null;
}

export const fetchProducts = async (
  filtersOrCategoriaId?: ProductFilters | string,
): Promise<FetchProductsResult> => {
  const filters: ProductFilters =
    typeof filtersOrCategoriaId === "string"
      ? { categoriaId: filtersOrCategoriaId }
      : filtersOrCategoriaId ?? {};

  const params = {
    ...(filters?.categoriaId ? { categoria_id: filters.categoriaId } : {}),
    ...(filters?.marcaId ? { marca_id: filters.marcaId } : {}),
    ...(filters?.destacado ? { destacado: true } : {}),
  };

  const response = await api.get<ProductsResponse>("/producto", {
    params: Object.keys(params).length > 0 ? params : undefined,
  });


  if (!response.data.success) {
    throw new Error("No se pudo obtener la lista de productos");
  }

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const fetchProductById = async (id: string): Promise<Producto> => {
  const response = await api.get<ProductByIdResponse>(`/producto/${id}`);

  if (!response.data.success) {
    throw new Error("No se pudo obtener el producto");
  }

  const payload = response.data.data;
  const product = Array.isArray(payload) ? payload[0] : payload;

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};

