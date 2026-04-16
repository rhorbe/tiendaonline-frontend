import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/global.css";

import App from "./app";
import { ProductProvider } from "./store/productProvider";
import { AuthProvider } from "./store/AuthContext";

const diferirRegistroServiceWorker = () => {
  const registrar = async () => {
    try {
      const { registrarServiceWorker } = await import("./app/registerServiceWorker");
      await registrarServiceWorker();
    } catch (error) {
      console.error("No fue posible inicializar el service worker", error);
    }
  };

  if (typeof window.requestIdleCallback === "function") {
    window.addEventListener("load", () => {
      window.requestIdleCallback(() => {
        void registrar();
      });
    });
    return;
  }

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      void registrar();
    }, 1500);
  });
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);

diferirRegistroServiceWorker();
