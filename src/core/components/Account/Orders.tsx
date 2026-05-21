import { useEffect, useMemo, useState } from "react";
import { fetchPedidos } from "@/core/api/pedidosApi";
import type { Pedido } from "@/core/models/Pedido";
import { useAuth } from "@/store/useAuth";

const formatFecha = (fecha?: string) => {
    if (!fecha) {
        return "-";
    }

    const parsed = new Date(fecha);
    if (Number.isNaN(parsed.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsed);
};

const formatPrecio = (pedido: Pedido) => {
    if (pedido.total_formatted) {
        return pedido.total_formatted;
    }

    if (typeof pedido.total === "number") {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(pedido.total);
    }

    return "-";
};

const getNumeroPedido = (pedido: Pedido) => pedido.numero ?? pedido.merchant_order_id ?? pedido.id ?? "-";

export default function Orders() {
    const { user } = useAuth();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadPedidos = async () => {
            const clienteId = user?.cliente_id;
            if (!clienteId) {
                if (isMounted) {
                    setError("No se pudo identificar el cliente.");
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                const data = await fetchPedidos(clienteId);
                if (!isMounted) {
                    return;
                }
                setPedidos(data);
                setError(null);
            } catch (err) {
                if (!isMounted) {
                    return;
                }
                setError(err instanceof Error ? err.message : "No se pudieron cargar los pedidos.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void loadPedidos();

        return () => {
            isMounted = false;
        };
    }, [user?.cliente_id]);

    const pedidosOrdenados = useMemo(() => {
        return [...pedidos].sort((a, b) => {
            const fechaA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const fechaB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return fechaB - fechaA;
        });
    }, [pedidos]);

    return (
        <div className="w-full space-y-10 py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Historial de pedidos
                </p>
                {loading && (
                    <p className="text-app-gray font-inter text-sm">Cargando pedidos...</p>
                )}
                {error && (
                    <p className="text-red-500 font-inter text-sm">{error}</p>
                )}
                {!loading && !error && pedidosOrdenados.length === 0 && (
                    <p className="text-app-gray font-inter text-sm">No hay pedidos registrados.</p>
                )}
            </div>
            {!loading && !error && pedidosOrdenados.length > 0 && (
                <>
                    <div className="overflow-x-auto hidden md:block">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="pb-6 text-left text-app-gray font-inter text-base/[26px] border-b border-app-light-gray font-normal">
                                        N.° de pedido
                                    </th>
                                    <th className="pb-6 text-left text-app-gray font-inter text-base/[26px] border-b border-app-light-gray font-normal">
                                        Fecha
                                    </th>
                                    <th className="pb-6 text-left text-app-gray font-inter text-base/[26px] border-b border-app-light-gray font-normal">
                                        Estado
                                    </th>
                                    <th className="pb-6 text-left text-app-gray font-inter text-base/[26px] border-b border-app-light-gray font-normal">
                                        Precio
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosOrdenados.map((pedido, index) => (
                                    <tr key={pedido.id ?? pedido.merchant_order_id ?? pedido.numero ?? index}>
                                        <td className="py-6 border-b border-app-light-gray text-app-black font-inter text-sm/[22px]">
                                            {getNumeroPedido(pedido)}
                                        </td>
                                        <td className="py-6 border-b border-app-light-gray text-app-black font-inter text-sm/[22px]">
                                            {formatFecha(pedido.created_at)}
                                        </td>
                                        <td className="py-6 border-b border-app-light-gray text-app-black font-inter text-sm/[22px]">
                                            {pedido.estado ?? "-"}
                                        </td>
                                        <td className="py-6 border-b border-app-light-gray text-left text-app-black font-inter text-sm/[22px]">
                                            {formatPrecio(pedido)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="block md:hidden space-y-6">
                        {pedidosOrdenados.map((pedido, index) => (
                            <table key={pedido.id ?? pedido.merchant_order_id ?? pedido.numero ?? index} className="w-full">
                                <tbody className="border-b border-app-light-gray">
                                    <tr>
                                        <th className="py-4 text-left text-app-gray font-inter text-sm">N.° de pedido:</th>
                                        <td className="py-4 text-left text-app-black font-inter text-sm">{getNumeroPedido(pedido)}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-4 text-left text-app-gray font-inter text-sm">Fecha:</th>
                                        <td className="py-4 text-left text-app-black font-inter text-sm">{formatFecha(pedido.created_at)}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-4 text-left text-app-gray font-inter text-sm">Estado:</th>
                                        <td className="py-4 text-left text-app-black font-inter text-sm">{pedido.estado ?? "-"}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-4 text-left text-app-gray font-inter text-sm">Precio:</th>
                                        <td className="py-4 text-left text-app-black font-inter text-sm">{formatPrecio(pedido)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                    </div>

                </>
            )}

        </div>
    );
}
