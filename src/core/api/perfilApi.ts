import api from "./axiosInstance";
import type { PerfilResponse } from "../models/Perfil";

export const fetchPerfil = async (): Promise<PerfilResponse> => {
  const response = await api.get<PerfilResponse>("/perfil");
  const perfil = response.data;

  if (!perfil || typeof perfil !== "object") {
    throw new Error("No se pudo obtener el perfil");
  }

  return perfil;
};
