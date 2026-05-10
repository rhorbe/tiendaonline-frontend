import api from "./axiosInstance";
import type { PerfilResponse, PerfilDireccion } from "../models/Perfil";

export const fetchPerfil = async (): Promise<PerfilResponse> => {
  const response = await api.get<PerfilResponse>("/perfil");
  const perfil = response.data;

  if (!perfil || typeof perfil !== "object") {
    throw new Error("No se pudo obtener el perfil");
  }

  return perfil;
};

export const updatePerfil = async (data: {
  name: string;
  last_name?: string;
}): Promise<PerfilResponse> => {
  const response = await api.put<PerfilResponse>("/perfil", data);
  return response.data;
};

export const changePassword = async (data: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/perfil/cambiar-contrasena",
    data
  );
  return response.data;
};

export const updatePhone = async (data: {
  telefono: string;
}): Promise<PerfilResponse> => {
  const response = await api.put<PerfilResponse>("/perfil/telefono", data);
  return response.data;
};

export const createDireccion = async (data: {
  etiqueta?: string;
  calle: string;
  numero: string;
  piso?: string;
  departamento?: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  pais: string;
  observaciones?: string;
  es_principal?: boolean;
}): Promise<PerfilDireccion> => {
  const response = await api.post<PerfilDireccion>(
    "/perfil/direcciones",
    data
  );
  return response.data;
};

export const updateDireccion = async (
  id: string,
  data: {
    etiqueta?: string;
    calle: string;
    numero: string;
    piso?: string;
    departamento?: string;
    ciudad: string;
    provincia: string;
    codigo_postal: string;
    pais: string;
    observaciones?: string;
    es_principal?: boolean;
  }
): Promise<PerfilDireccion> => {
  const response = await api.put<PerfilDireccion>(
    `/perfil/direcciones/${id}`,
    data
  );
  return response.data;
};

export const deleteDireccion = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(
    `/perfil/direcciones/${id}`
  );
  return response.data;
};

