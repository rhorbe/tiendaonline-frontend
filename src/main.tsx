import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "flowbite";
import "@/global.css";

import App from "./app";
import { ProductProvider } from "./store/ProductContext";
import { AuthProvider } from "./store/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
