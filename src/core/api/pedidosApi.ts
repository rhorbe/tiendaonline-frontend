import api from "./axiosInstance";
import type { PedidosResponse } from "../models/Pedido";

interface PedidoBackend {
  id: string;
  numero?: string;
  estado?: string;
  total?: string | number;
  fecha?: string;
  created_at?: string;
  [key: string]: unknown;
}

interface PedidosApiResponse {
  success: boolean;
  cliente: unknown;
  data: PedidoBackend[];
  count: number;
}

export const fetchPedidos = async (clienteId: string): Promise<PedidosResponse> => {
  console.info(`Obteniendo pedidos para cliente ID: ${clienteId}`);

  const response = await api.get<PedidosApiResponse>(`/cliente/${clienteId}/pedidos`);
  const responseData = response.data;

  console.info(response.data);

  if (!responseData?.success || !Array.isArray(responseData.data)) {
    throw new Error("No se pudieron obtener los pedidos");
  }

  return responseData.data.map((pedido) => {
    const total = typeof pedido.total === "string" ? Number(pedido.total) : pedido.total;

    return {
      ...pedido,
      numero: pedido.numero,
      estado: pedido.estado,
      total: Number.isFinite(total) ? total : undefined,
      created_at: pedido.created_at ?? pedido.fecha,
    };
  });
};

