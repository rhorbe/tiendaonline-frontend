import { Producto } from "@/core/models/Producto.ts";
import { createContext, type Dispatch } from "react";

type ProductListMeta = {
  total: number;
  to: number;
};

export type ProductState = {
  productos: Producto[];
  meta: ProductListMeta | null;
};

export type ProductAction = {
  type: "SET_PRODUCTS";
  payload: { productos: Producto[]; meta?: ProductListMeta };
};

export type ProductContextValue = {
  state: ProductState;
  dispatch: Dispatch<ProductAction>;
};

export const initialProductState: ProductState = {
  productos: [],
  meta: null,
};

export const ProductContext = createContext<ProductContextValue>({
  state: initialProductState,
  dispatch: () => null,
});

export const productReducer = (
  state: ProductState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        productos: action.payload.productos,
        meta: action.payload.meta ?? null,
      };
    default:
      return state;
  }
};



