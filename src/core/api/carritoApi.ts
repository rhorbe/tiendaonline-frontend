import { AxiosError } from "axios";
import api from "./axiosInstance";
import { getOfflineErrorFromUnknown } from "./networkError";
import { CartItem, normalizePrice } from "@/store/productContext";

type CarritoItemPayload = {
  cliente_id: string;
  variante_producto_id: string;
  cantidad: number;
};

type CarritoItem = {
  _id: string;
  variante_producto_id: string;
  cantidad: number;
};

type Carrito = {
  _id: string;
  cliente_id: string;
  items: CarritoItem[];
};

type BackendProduct = {
  id?: string;
  _id?: string;
  nombre?: string;
  marca?: string;
  image_url?: string | null;
};

type BackendCliente = {
  id?: string;
  _id?: string;
  user_id?: string;
  user?: {
    id?: string;
    _id?: string;
  };
};

type BackendVariantSize = {
  nombre?: string;
};

type BackendVariant = {
  id?: string;
  _id?: string;
  producto_id?: string;
  precio?: string | number;
  stock?: number;
  tamano?: string;
  tamanio?: BackendVariantSize;
  producto?: BackendProduct;
};

type BackendCartItem = {
  id?: string;
  _id?: string;
  cantidad?: number;
  variante_producto_id?: string;
  variante_producto?: BackendVariant;
  producto?: BackendProduct;
  precio?: string | number;
  precio_unitario?: string | number;
};

type BackendCart = {
  id?: string;
  _id?: string;
  cliente_id?: string;
  cliente?: BackendCliente;
  items?: BackendCartItem[];
};

type AddCarritoItemResponse = {
  success: boolean;
  data: Carrito;
};

type GetCarritoResponse = {
  success?: boolean;
  data?: BackendCart;
  items?: BackendCartItem[];
};

type GetCarritosResponse = {
  success?: boolean;
  data?: BackendCart[] | BackendCart;
};

type BackendValidationError = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export const addItemToCart = async (payload: CarritoItemPayload): Promise<Carrito> => {
  const { data } = await api.post<AddCarritoItemResponse>("/carrito/item", payload);

  if (!data.success || !data.data) {
    throw new Error("No se pudo guardar el producto en el carrito.");
  }

  return data.data;
};

const getVariantId = (item: BackendCartItem): string => {
  return item.variante_producto_id ?? item.variante_producto?.id ?? item.variante_producto?._id ?? "";
};

const getCartId = (cart: BackendCart): string => {
  return cart.id ?? cart._id ?? "";
};

const getCartItemId = (item: BackendCartItem): string => {
  return item.id ?? item._id ?? "";
};

const mapBackendItemToCartItem = (item: BackendCartItem): CartItem | null => {
  const variantId = getVariantId(item);
  if (!variantId) {
    return null;
  }

  const variant = item.variante_producto;
  const product = item.producto ?? variant?.producto;

  return {
    varianteId: variantId,
    productId: product?.id ?? product?._id ?? variant?.producto_id ?? "",
    nombre: product?.nombre ?? "Producto",
    marca: product?.marca ?? "",
    imageUrl: product?.image_url ?? "/images/cart-product.png",
    varianteLabel: variant?.tamano ?? variant?.tamanio?.nombre ?? "",
    unitPrice: normalizePrice(item.precio ?? item.precio_unitario ?? variant?.precio),
    quantity: Math.max(1, item.cantidad ?? 1),
    stock: Math.max(1, variant?.stock ?? item.cantidad ?? 1),
  };
};

const toCartArray = (payload: GetCarritosResponse): BackendCart[] => {
  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.data) {
    return [payload.data];
  }

  return [];
};

const getUserIdFromCart = (cart: BackendCart): string => {
  return cart.cliente?.user_id ?? cart.cliente?.user?.id ?? cart.cliente?.user?._id ?? "";
};

const findCartByUserId = (carts: BackendCart[], userId: string): BackendCart | null => {
  const found = carts.find((cart) => getUserIdFromCart(cart) === userId);
  return found ?? null;
};

const getClienteIdFromCart = (cart: BackendCart): string => {
  return cart.cliente_id ?? cart.cliente?.id ?? cart.cliente?._id ?? "";
};

export const getCartContextByUserId = async (
  userId: string,
): Promise<{ clienteId: string | null; carritoId: string | null; cartItems: CartItem[] }> => {
  const { data } = await api.get<GetCarritosResponse>("/carrito");
  const carts = toCartArray(data);
  const userCart = findCartByUserId(carts, userId);

  if (!userCart) {
    return {
      clienteId: null,
      carritoId: null,
      cartItems: [],
    };
  }

  const cartItems = (userCart.items ?? [])
    .map(mapBackendItemToCartItem)
    .filter((item): item is CartItem => item !== null);

  return {
    clienteId: getClienteIdFromCart(userCart) || null,
    carritoId: getCartId(userCart) || null,
    cartItems,
  };
};

export const resolveClienteIdByUserId = async (userId: string): Promise<string | null> => {
  const context = await getCartContextByUserId(userId);
  return context.clienteId;
};

const findCartItemIdsByUserAndVariant = async (
  userId: string,
  varianteId: string,
): Promise<{ carritoId: string; itemId: string } | null> => {
  const { data } = await api.get<GetCarritosResponse>("/carrito");
  const carts = toCartArray(data);
  const userCart = findCartByUserId(carts, userId);

  if (!userCart) {
    return null;
  }

  const matchedItem = (userCart.items ?? []).find((item) => getVariantId(item) === varianteId);
  if (!matchedItem) {
    return null;
  }

  const carritoId = getCartId(userCart);
  const itemId = getCartItemId(matchedItem);

  if (!carritoId || !itemId) {
    return null;
  }

  return { carritoId, itemId };
};

export const removeItemFromCart = async (carritoId: string, itemId: string): Promise<void> => {
  await api.delete(`/carrito/${carritoId}/item/${itemId}`);
};

export const removeItemFromUserCart = async (
  userId: string,
  varianteId: string,
): Promise<{ removed: boolean }> => {
  const ids = await findCartItemIdsByUserAndVariant(userId, varianteId);
  if (!ids) {
    return { removed: false };
  }

  await removeItemFromCart(ids.carritoId, ids.itemId);
  return { removed: true };
};

export const getCartByClient = async (clienteId: string): Promise<CartItem[]> => {
  try {
    const { data } = await api.get<GetCarritoResponse>(`/cliente/${clienteId}/carrito`);
    const rawData = data as unknown;
    const backendItems = Array.isArray(rawData)
      ? (rawData as BackendCartItem[])
      : data.data?.items ?? data.items ?? [];

    return backendItems
      .map(mapBackendItemToCartItem)
      .filter((item): item is CartItem => item !== null);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      return [];
    }

    throw error;
  }
};

export const getCartByClientErrorMessage = (error: unknown): string => {
  const offlineMessage = getOfflineErrorFromUnknown(error, "obtener el carrito");
  if (offlineMessage) {
    return offlineMessage;
  }

  const axiosError = error as AxiosError<BackendValidationError>;
  const backendData = axiosError.response?.data;

  return backendData?.message ?? backendData?.error ?? "No se pudo sincronizar el carrito del usuario.";
};

export const getAddItemCartErrorMessage = (error: unknown): string => {
  const offlineMessage = getOfflineErrorFromUnknown(error, "guardar el producto en el carrito");
  if (offlineMessage) {
    return offlineMessage;
  }

  const axiosError = error as AxiosError<BackendValidationError>;
  const backendData = axiosError.response?.data;

  if (axiosError.response?.status === 422 && backendData?.errors) {
    const firstError = Object.values(backendData.errors)
      .flat()
      .find((message) => message.trim().length > 0);

    if (firstError) {
      return firstError;
    }
  }

  return (
    backendData?.message ??
    backendData?.error ??
    "No se pudo agregar el producto al carrito. Intenta nuevamente."
  );
};

export const getRemoveItemCartErrorMessage = (error: unknown): string => {
  const offlineMessage = getOfflineErrorFromUnknown(error, "quitar el producto del carrito");
  if (offlineMessage) {
    return offlineMessage;
  }

  const axiosError = error as AxiosError<BackendValidationError>;
  const backendData = axiosError.response?.data;

  return (
    backendData?.message ??
    backendData?.error ??
    "No se pudo quitar el producto del carrito. Intenta nuevamente."
  );
};


