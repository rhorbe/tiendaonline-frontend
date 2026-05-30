import {VarianteProducto} from "@/core/models/VarianteProducto.ts";

export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    image_id: string | null;
    image_url: string | null;
    precio: string | number;
    categoria: string;
    marca: string;
    variantes?: VarianteProducto[];
    activo: boolean;
    destacado: boolean;
    nuevo: boolean;
    oferta: boolean;
    label?: string;
    valoracion: number;
}

export interface ProductsMeta {
    total: number;
    to: number;
}

export interface ProductsResponse {
    success: boolean;
    data: Producto[];
    count: number;
    meta?: ProductsMeta;
}
