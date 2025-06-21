import api from "./axiosInstance";
import { Brand, BrandsResponse } from "../models/Brand";

export const fetchBrands = async (): Promise<Brand[]> => {

  const response = await api.get<BrandsResponse>("/brand");


  if (!response.data.success) {
    throw new Error("No se pudo obtener la lista de marcas");
  }

  return response.data.data;
};