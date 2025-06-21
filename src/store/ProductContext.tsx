import { Product } from "@/core/models/Product";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  products: Product[];
};

type Action = { type: "SET_PRODUCTS"; payload: Product[] };

const initialState: State = {
  products: [],
};

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
