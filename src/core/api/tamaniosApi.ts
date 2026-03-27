import api from "./axiosInstance";
import {Tamanio, TamaniosResponse} from "../models/Tamanio.ts";

let tamaniosCache: Tamanio[] | null = null;
let tamaniosInFlight: Promise<Tamanio[]> | null = null;

export const fetchTamanio = async (): Promise<Tamanio[]> => {
  if (tamaniosCache) {
    return tamaniosCache;
  }

  if (tamaniosInFlight) {
    return tamaniosInFlight;
  }

  tamaniosInFlight = (async () => {
    const response = await api.get<TamaniosResponse | unknown[]>("/tamanio");
    const payload = response.data as
      | TamaniosResponse
      | { success?: boolean; data?: unknown }
      | unknown[];

    if (!Array.isArray(payload) && payload?.success === false) {
      throw new Error("No se pudo obtener la lista de tamaños");
    }

    const rawSizes = Array.isArray(payload) ? payload : payload?.data;

    if (!Array.isArray(rawSizes)) {
      throw new Error("Formato de tamaños inválido");
    }

    const mappedSizes = rawSizes.map((item) => {
      const tamanio = item as { id: string | number; nombre?: string };
      return {
        id: String(tamanio.id),
        name: tamanio.nombre ?? "",
      };
    });

    tamaniosCache = mappedSizes;
    return mappedSizes;
  })();

  try {
    return await tamaniosInFlight;
  } finally {
    tamaniosInFlight = null;
  }
};