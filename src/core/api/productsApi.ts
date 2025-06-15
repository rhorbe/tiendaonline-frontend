import api from "./axiosInstance";
import { Product, ProductsResponse } from "../models/Product";

export const fetchProducts = async (): Promise<Product[]> => {

  const response = await api.get<ProductsResponse>("/product");


  if (!response.data.success) {
    throw new Error("No se pudo obtener la lista de productos");
  }

  return response.data.data;
};
