import api from "./axiosInstance";
import { Brand, BrandsResponse } from "../models/Brand";

let marcasCache: Brand[] | null = null;
let marcasInFlight: Promise<Brand[]> | null = null;

export const fetchBrands = async (): Promise<Brand[]> => {
  if (marcasCache) {
    return marcasCache;
  }

  if (marcasInFlight) {
    return marcasInFlight;
  }

  marcasInFlight = (async () => {
    const response = await api.get<BrandsResponse | unknown[]>('/marca');
    const payload = response.data as
      | BrandsResponse
      | { success?: boolean; data?: unknown }
      | unknown[];

    if (!Array.isArray(payload) && payload?.success === false) {
      throw new Error("No se pudo obtener la lista de marcas");
    }

    const rawBrands = Array.isArray(payload) ? payload : payload?.data;

    if (!Array.isArray(rawBrands)) {
      throw new Error("Formato de marcas inválido");
    }

    const mappedBrands = rawBrands.map((item) => {
      const brand = item as { id: string | number; name?: string; nombre?: string };
      return {
        id: String(brand.id),
        name: brand.name ?? brand.nombre ?? "",
      };
    });

    marcasCache = mappedBrands;
    return mappedBrands;
  })();

  try {
    return await marcasInFlight;
  } finally {
    marcasInFlight = null;
  }
};