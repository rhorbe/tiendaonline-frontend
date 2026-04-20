import { ReactNode, useEffect, useReducer, useRef } from "react";
import {
  initialProductState,
  productReducer,
  ProductContext,
  type CartItem,
} from "@/store/productContext";
import { useAuth } from "@/store/useAuth";
import {
  addItemToCart,
  getCartByClient,
  getCartByClientErrorMessage,
  getCartContextByUserId,
} from "@/core/api/carritoApi";

const clampQuantityByStock = (quantity: number, stock: number) => {
  const safeStock = Math.max(1, stock || 1);
  return Math.max(1, Math.min(quantity, safeStock));
};

const mergeCartItems = (backendItems: CartItem[], guestItems: CartItem[]): CartItem[] => {
  const merged = new Map<string, CartItem>();

  for (const item of backendItems) {
    merged.set(item.varianteId, {
      ...item,
      quantity: clampQuantityByStock(item.quantity, item.stock),
    });
  }

  for (const guestItem of guestItems) {
    const existing = merged.get(guestItem.varianteId);

    if (!existing) {
      merged.set(guestItem.varianteId, {
        ...guestItem,
        quantity: clampQuantityByStock(guestItem.quantity, guestItem.stock),
      });
      continue;
    }

    const stockLimit = Math.max(1, existing.stock || guestItem.stock || 1);

    merged.set(guestItem.varianteId, {
      ...existing,
      stock: stockLimit,
      quantity: clampQuantityByStock(existing.quantity + guestItem.quantity, stockLimit),
    });
  }

  return Array.from(merged.values());
};

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

    const hadAuthenticatedSession = Boolean(authenticatedUserIdRef.current);
    const guestCartSnapshot = hadAuthenticatedSession ? [] : state.cartItems;

    authenticatedUserIdRef.current = currentUserId;

    if (lastUserIdRef.current === currentUserId) {
      return;
    }

    let cancelled = false;

    const syncCart = async () => {
      try {
        let clienteId = currentClienteId;
        let backendCartItems: CartItem[];

        if (clienteId) {
          backendCartItems = await getCartByClient(clienteId);
        } else {
          const context = await getCartContextByUserId(currentUserId);
          clienteId = context.clienteId;
          backendCartItems = context.cartItems;
        }

        if (guestCartSnapshot.length > 0 && clienteId) {
          await Promise.all(
            guestCartSnapshot.map((item) =>
              addItemToCart({
                cliente_id: clienteId,
                variante_producto_id: item.varianteId,
                cantidad: item.quantity,
              }),
            ),
          );

          backendCartItems = await getCartByClient(clienteId);
        }

        if (cancelled) {
          return;
        }

        const mergedCartItems = mergeCartItems(backendCartItems, guestCartSnapshot);

        dispatch({
          type: "SET_CART_ITEMS",
          payload: { cartItems: mergedCartItems },
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
  }, [dispatch, state.cartItems, user?.cliente_id, user?.id]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
