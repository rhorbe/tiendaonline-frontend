import api from "./axiosInstance";
import { Category, CategoriesResponse } from "../models/Category";

export const fetchCategories = async (): Promise<Category[]> => {

  const response = await api.get<CategoriesResponse>("/categoria");


  if (!response.data.success) {
    throw new Error("No se pudo obtener la lista de categorías");
  }

  return response.data.data;
};