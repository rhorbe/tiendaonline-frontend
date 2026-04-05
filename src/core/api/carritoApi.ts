import { AxiosError } from "axios";
import api from "./axiosInstance";

type CarritoItemPayload = {
  cliente_id: string;
  variante_producto_id: string;
  cantidad: number;
};

type CarritoItem = {
  _id: string;
  variante_producto_id: string;
  cantidad: number;
};

type Carrito = {
  _id: string;
  cliente_id: string;
  items: CarritoItem[];
};

type AddCarritoItemResponse = {
  success: boolean;
  data: Carrito;
};

type BackendValidationError = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export const addItemToCart = async (payload: CarritoItemPayload): Promise<Carrito> => {
  const { data } = await api.post<AddCarritoItemResponse>("/carrito/item", payload);

  if (!data.success || !data.data) {
    throw new Error("No se pudo guardar el producto en el carrito.");
  }

  return data.data;
};

export const getAddItemCartErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<BackendValidationError>;
  const backendData = axiosError.response?.data;

  if (axiosError.response?.status === 422 && backendData?.errors) {
    const firstError = Object.values(backendData.errors)
      .flat()
      .find((message) => typeof message === "string" && message.trim().length > 0);

    if (firstError) {
      return firstError;
    }
  }

  return (
    backendData?.message ??
    backendData?.error ??
    "No se pudo agregar el producto al carrito. Intenta nuevamente."
  );
};

