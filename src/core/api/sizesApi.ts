import api from "./axiosInstance";
import { Size, SizesResponse } from "../models/Size";

export const fetchSizes = async (): Promise<Size[]> => {

  const response = await api.get<SizesResponse>('/tamanio');


  if (!response.data.success) {
    throw new Error("No se pudo obtener la lista de tamaños");
  }

  return response.data.data;
};