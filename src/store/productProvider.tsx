import { ReactNode, useEffect, useReducer, useRef } from "react";
import {
  initialProductState,
  productReducer,
  ProductContext,
} from "@/store/productContext";
import { useAuth } from "@/store/useAuth";
import {
  getCartByClient,
  getCartByClientErrorMessage,
  getCartContextByUserId,
} from "@/core/api/carritoApi";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);
  const { user } = useAuth();
  const lastUserIdRef = useRef<string | null>(null);
  const authenticatedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUserId = user?.id ?? null;
    const currentClienteId = user?.cliente_id ?? null;

    if (!currentUserId) {
      if (authenticatedUserIdRef.current) {
        dispatch({ type: "CLEAR_CART" });
      }

      authenticatedUserIdRef.current = null;
      lastUserIdRef.current = null;
      return;
    }

    authenticatedUserIdRef.current = currentUserId;

    if (lastUserIdRef.current === currentUserId) {
      return;
    }

    let cancelled = false;

    const syncCart = async () => {
      try {
        const backendCartItems = currentClienteId
          ? await getCartByClient(currentClienteId)
          : (await getCartContextByUserId(currentUserId)).cartItems;

        if (cancelled) {
          return;
        }

        dispatch({
          type: "SET_CART_ITEMS",
          payload: { cartItems: backendCartItems },
        });
      } catch (error: unknown) {
        if (!cancelled) {
          console.warn(getCartByClientErrorMessage(error), error);
        }
      } finally {
        if (!cancelled) {
          lastUserIdRef.current = currentUserId;
        }
      }
    };

    void syncCart();

    return () => {
      cancelled = true;
    };
  }, [dispatch, user?.cliente_id, user?.id]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

