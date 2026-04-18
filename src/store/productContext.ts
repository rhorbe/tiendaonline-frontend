import { Producto } from "@/core/models/Producto.ts";
import { createContext, type Dispatch } from "react";

type ProductListMeta = {
  total: number;
  to: number;
};

export type CartItem = {
  varianteId: string;
  productId: string;
  nombre: string;
  marca: string;
  imageUrl: string;
  varianteLabel: string;
  unitPrice: number;
  quantity: number;
  stock: number;
};

export const normalizePrice = (price: string | number | undefined) => {
  if (typeof price === "string") {
    const sanitized = price.trim().replace(/\s+/g, "");
    const normalized =
      sanitized.includes(",") && sanitized.includes(".")
        ? sanitized.replace(/\./g, "").replace(/,/g, ".")
        : sanitized.replace(/,/g, ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (typeof price === "number") {
    return Number.isFinite(price) ? price : 0;
  }

  return 0;
};

export type ProductState = {
  productos: Producto[];
  meta: ProductListMeta | null;
  cartItems: CartItem[];
};

export type ProductAction =
  | {
      type: "SET_PRODUCTS";
      payload: { productos: Producto[]; meta?: ProductListMeta };
    }
  | {
      type: "ADD_TO_CART";
      payload: Omit<CartItem, "quantity"> & { quantity?: number };
    }
  | {
      type: "UPDATE_CART_QTY";
      payload: { varianteId: string; quantity: number };
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: { varianteId: string };
    }
  | {
      type: "CLEAR_CART";
    }
  | {
      type: "SET_CART_ITEMS";
      payload: { cartItems: CartItem[] };
    };

export type ProductContextValue = {
  state: ProductState;
  dispatch: Dispatch<ProductAction>;
};

export const initialProductState: ProductState = {
  productos: [],
  meta: null,
  cartItems: [],
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
      return {
        ...state,
        productos: action.payload.productos,
        meta: action.payload.meta ?? null,
      };
    case "ADD_TO_CART": {
      const incomingQty = Math.max(1, action.payload.quantity ?? 1);
      const stockLimit = Math.max(1, action.payload.stock || 1);
      const existingItem = state.cartItems.find(
        (item) => item.varianteId === action.payload.varianteId,
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.varianteId !== action.payload.varianteId) {
              return item;
            }

            return {
              ...item,
              quantity: Math.min(item.quantity + incomingQty, stockLimit),
              stock: stockLimit,
              unitPrice: action.payload.unitPrice,
            };
          }),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: Math.min(incomingQty, stockLimit),
          },
        ],
      };
    }
    case "UPDATE_CART_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.varianteId !== action.payload.varianteId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.max(1, Math.min(action.payload.quantity, item.stock || 1)),
          };
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.varianteId !== action.payload.varianteId,
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};



