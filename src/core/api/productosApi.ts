import api from "./axiosInstance";
import { Producto, ProductsResponse } from "../models/Producto.ts";

export const fetchProducts = async (categoriaId?: string): Promise<Producto[]> => {
  const response = await api.get<ProductsResponse>("/producto", {
    params: categoriaId ? { categoria_id: categoriaId } : undefined,
  });


  if (!response.data.success) {
    throw new Error("No se pudo obtener la lista de productos");
  }

  return response.data.data;
};
