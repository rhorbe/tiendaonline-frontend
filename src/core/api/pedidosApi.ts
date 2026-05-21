import api from "./axiosInstance";
import type { Pedido, PedidosResponse } from "../models/Pedido";

export const fetchPedidos = async (clienteId: string): Promise<PedidosResponse> => {

  console.info(`Obteniendo pedidos para cliente ID: ${clienteId}`);

  const response = await api.get<PedidosResponse>(`/cliente/${clienteId}/pedidos`);
  const data = response.data;

  console.info(response.data);

  if (!Array.isArray(data)) {
    throw new Error("No se pudieron obtener los pedidos");
  }

  return data as Pedido[];
};

