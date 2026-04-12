import { AxiosError } from "axios";
import api from "./axiosInstance";
import { getOfflineErrorFromUnknown } from "./networkError";

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
  const offlineMessage = getOfflineErrorFromUnknown(error, "guardar el producto en el carrito");
  if (offlineMessage) {
    return offlineMessage;
  }

  const axiosError = error as AxiosError<BackendValidationError>;
  const backendData = axiosError.response?.data;

  if (axiosError.response?.status === 422 && backendData?.errors) {
    const firstError = Object.values(backendData.errors)
      .flat()
      .find((message) => message.trim().length > 0);

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

