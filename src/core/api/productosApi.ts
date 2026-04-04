import api from "./axiosInstance";
import { Producto, ProductsResponse } from "../models/Producto.ts";

export interface ProductFilters {
  categoriaId?: string;
  marcaId?: string;
}

export const fetchProducts = async (
  filtersOrCategoriaId?: ProductFilters | string,
): Promise<Producto[]> => {
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

  return response.data.data;
};
