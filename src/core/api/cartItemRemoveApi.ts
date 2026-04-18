import { AxiosError } from "axios";
import api from "./axiosInstance";
import { getOfflineErrorFromUnknown } from "./networkError";

type BackendValidationError = {
  success?: boolean;
  message?: string;
  error?: string;
};

type BackendCartItem = {
  id?: string;
  _id?: string;
  variante_producto_id?: string;
  variante_producto?: {
    id?: string;
    _id?: string;
  };
};

type BackendCart = {
  id?: string;
  _id?: string;
  cliente?: {
    user_id?: string;
    user?: {
      id?: string;
      _id?: string;
    };
  };
  items?: BackendCartItem[];
};

type GetCarritosResponse = {
  data?: BackendCart[] | BackendCart;
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

const getVariantId = (item: BackendCartItem): string => {
  return item.variante_producto_id ?? item.variante_producto?.id ?? item.variante_producto?._id ?? "";
};

const getCartId = (cart: BackendCart): string => {
  return cart.id ?? cart._id ?? "";
};

const getCartItemId = (item: BackendCartItem): string => {
  return item.id ?? item._id ?? "";
};

const findCartItemIdsByUserAndVariant = async (
  userId: string,
  varianteId: string,
): Promise<{ carritoId: string; itemId: string } | null> => {
  const { data } = await api.get<GetCarritosResponse>("/carrito");
  const carts = toCartArray(data);
  const userCart = carts.find((cart) => getUserIdFromCart(cart) === userId);

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

export const removeItemFromUserCart = async (
  userId: string,
  varianteId: string,
): Promise<{ removed: boolean }> => {
  const ids = await findCartItemIdsByUserAndVariant(userId, varianteId);
  if (!ids) {
    return { removed: false };
  }

  await api.delete(`/carrito/${ids.carritoId}/item/${ids.itemId}`);
  return { removed: true };
};

export const updateItemQuantityInUserCart = async (
  userId: string,
  varianteId: string,
  quantity: number,
): Promise<{ updated: boolean }> => {
  const ids = await findCartItemIdsByUserAndVariant(userId, varianteId);
  if (!ids) {
    return { updated: false };
  }

  await api.put(`/carrito/${ids.carritoId}/item/${ids.itemId}`, {
    cantidad: quantity,
  });

  return { updated: true };
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

export const getUpdateCartItemErrorMessage = (error: unknown): string => {
  const offlineMessage = getOfflineErrorFromUnknown(error, "actualizar la cantidad del carrito");
  if (offlineMessage) {
    return offlineMessage;
  }

  const axiosError = error as AxiosError<BackendValidationError>;
  const backendData = axiosError.response?.data;

  return (
    backendData?.message ??
    backendData?.error ??
    "No se pudo actualizar la cantidad del producto. Intenta nuevamente."
  );
};

