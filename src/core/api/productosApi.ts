import api from "./axiosInstance";
import { Producto, ProductsMeta, ProductsResponse } from "../models/Producto.ts";

export interface ProductFilters {
  categoriaId?: string;
  marcaId?: string;
}

export interface FetchProductsResult {
  data: Producto[];
  meta?: ProductsMeta;
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
