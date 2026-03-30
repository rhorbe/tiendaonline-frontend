import { useContext } from "react";
import { ProductContext } from "@/store/productContext";

export const useProductContext = () => useContext(ProductContext);

