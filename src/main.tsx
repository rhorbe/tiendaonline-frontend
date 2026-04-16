import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/global.css";

import App from "./app";
import { ProductProvider } from "./store/productProvider";
import { AuthProvider } from "./store/AuthContext";
import { registrarServiceWorker } from "./app/registerServiceWorker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);

registrarServiceWorker().catch((error) => {
  console.error("No fue posible inicializar el service worker", error);
});
