import { ReactNode, useReducer } from "react";
import {
  initialProductState,
  productReducer,
  ProductContext,
} from "@/store/productContext";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

