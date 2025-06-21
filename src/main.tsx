import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "flowbite";
import "@/global.css";

import App from "./app";
import { ProductProvider } from "./store/ProductContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>
);
