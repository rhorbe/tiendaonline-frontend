import { Producto } from "@/core/models/Producto.ts";
import { createContext, type Dispatch } from "react";

export type ProductState = {
  productos: Producto[];
};

export type ProductAction = { type: "SET_PRODUCTS"; payload: Producto[] };

export type ProductContextValue = {
  state: ProductState;
  dispatch: Dispatch<ProductAction>;
};

export const initialProductState: ProductState = {
  productos: [],
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
      return { ...state, productos: action.payload };
    default:
      return state;
  }
};



