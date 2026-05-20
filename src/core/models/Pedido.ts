export interface Pedido {
  id: string;
  numero?: string;
  merchant_order_id?: string;
  estado?: string;
  total?: number;
  total_formatted?: string;
  created_at?: string;
  [key: string]: unknown;
}

export type PedidosResponse = Pedido[];
