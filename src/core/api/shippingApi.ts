import api from "./axiosInstance";
import { MetodoEnvio } from "@/core/enum/MetodoEnvio";

export interface CotizarEnvioRequest {
  metodo_envio: MetodoEnvio;
  direccion_id?: string;
}

export interface CotizarEnvioResponse {
  subtotal: number;
  costo_envio: number;
  total: number;
}

const cotizarEnvio = async (
  payload: CotizarEnvioRequest,
): Promise<CotizarEnvioResponse> => {
  const { data } = await api.post<CotizarEnvioResponse>(
    "/envio/cotizar",
    payload,
  );

  if (
    !data ||
    typeof data !== "object" ||
    typeof data.subtotal !== "number" ||
    typeof data.costo_envio !== "number" ||
    typeof data.total !== "number"
  ) {
    throw new Error("No se pudo cotizar el envío.");
  }

  return data;
};

const shippingApi = {
  cotizarEnvio,
};

export default shippingApi;

