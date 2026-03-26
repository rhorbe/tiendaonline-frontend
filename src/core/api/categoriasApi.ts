import api from "./axiosInstance";
import { Categoria, CategoriasResponse } from "../models/Categoria";

export const fetchCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get<CategoriasResponse | unknown[]>("/categoria");
  const payload = response.data as
    | CategoriasResponse
    | { success?: boolean; data?: unknown }
    | unknown[];

  if (!Array.isArray(payload) && payload?.success === false) {
    throw new Error("No se pudo obtener la lista de categorías");
  }

  const rawCategories = Array.isArray(payload) ? payload : payload?.data;

  if (!Array.isArray(rawCategories)) {
    throw new Error("Formato de categorías inválido");
  }

  return rawCategories.map((item) => {
    const category = item as { id: string | number; nombre?: string; name?: string };
    return {
      id: String(category.id),
      nombre: category.nombre ?? category.name ?? "",
    };
  });
};