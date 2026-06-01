import api from "./axiosInstance";
import { MetodoEnvio } from "@/core/enum/MetodoEnvio";

export interface ProcesarCompraRequest {
  carrito_id: string;
  metodo_envio: MetodoEnvio;
  direccion_id?: string;
}

export interface ProcesarCompraResponse {
  success: boolean;
  data: {
    pedido: {
      id: string;
      estado: string;
    };
    pago: {
      id: string;
      estado: string;
    };
    checkout_url?: string;
  };
}

const procesarCompra = async (payload: ProcesarCompraRequest): Promise<ProcesarCompraResponse> => {
  const { data } = await api.post<ProcesarCompraResponse>("/checkout/procesar-compra", payload);
  return data;
};

const checkoutApi = {
  procesarCompra,
};

export default checkoutApi;

