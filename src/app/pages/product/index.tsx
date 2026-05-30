import ProductSlider from "@/core/components/ProductSlider";
import {Link, useParams} from "react-router-dom";
import {useProductContext} from "@/store/useProductContext";
import {normalizePrice} from "@/store/productContext";
import {ROUTES} from "@/core/enum/common";
import {useEffect, useMemo, useRef, useState} from "react";
import {VarianteProducto} from "@/core/models/VarianteProducto.ts";
import {fetchProductById} from "@/core/api/productosApi.ts";
import {Producto} from "@/core/models/Producto.ts";
import {useAuth} from "@/store/useAuth";
import {
    addItemToCart,
    getAddItemCartErrorMessage,
    resolveClienteIdByUserId,
} from "@/core/api/carritoApi";
import Modal from "@/core/components/Modal";
import {getOfflineErrorFromUnknown, isOfflineByNavigator} from "@/core/api/networkError";

const formatCurrency = (price: number) =>
    price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });

export default function ProductPage() {
    const {id} = useParams();
    const {state, dispatch} = useProductContext();
    const {cartItems} = state;
    const productoEnContexto = state.productos.find((p) => p.id === id);
    const [productoRemoto, setProductoRemoto] = useState<Producto | null>(null);
    const [cargandoProducto, setCargandoProducto] = useState(false);
    const [errorProducto, setErrorProducto] = useState<string | null>(null);
    const producto = productoEnContexto ?? productoRemoto;
    const {user} = useAuth();
    const [isCartErrorModalOpen, setIsCartErrorModalOpen] = useState(false);
    const [cartErrorMessage, setCartErrorMessage] = useState("");
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        let isMounted = true;

        setProductoRemoto(null);
        setErrorProducto(null);

        if (!id) {
            setCargandoProducto(false);
            setErrorProducto("Producto no encontrado.");
            return;
        }

        if (productoEnContexto) {
            setCargandoProducto(false);
            return;
        }

        setCargandoProducto(true);

        fetchProductById(id)
            .then((product) => {
                if (!isMounted) {
                    return;
                }

                setProductoRemoto(product);
            })
            .catch((error: unknown) => {
                if (!isMounted) {
                    return;
                }

                const status =
                    typeof error === "object" && error !== null && "response" in error
                        ? (error as { response?: { status?: number } }).response?.status
                        : undefined;

                setErrorProducto(
                    status === 404
                        ? "Producto no encontrado."
                        : getOfflineErrorFromUnknown(error, "cargar este producto") ??
                        "No se pudo cargar el producto. Intenta nuevamente.",
                );
            })
            .finally(() => {
                if (isMounted) {
                    setCargandoProducto(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id, productoEnContexto]);

    const [quantity, setQuantity] = useState(1);
    const [descripcionExpandida, setDescripcionExpandida] = useState(false);
    const [mostrarToggleDescripcion, setMostrarToggleDescripcion] = useState(false);
    const descripcionRef = useRef<HTMLParagraphElement>(null);
    const productVariants = useMemo<VarianteProducto[]>(
        () => producto?.variantes ?? [],
        [producto],
    );

    const firstAvailableVariante = useMemo(
        () =>
            productVariants.find((variant) => variant.activa && variant.stock > 0) ??
            productVariants[0],
        [productVariants],
    );

    const [selectedVarianteId, setSelectedVarianteId] = useState<string | undefined>(
        firstAvailableVariante?.id,
    );

    useEffect(() => {
        setSelectedVarianteId(firstAvailableVariante?.id);
    }, [firstAvailableVariante?.id]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "auto"});
    }, [id]);

    useEffect(() => {
        setDescripcionExpandida(false);
    }, [producto?.id]);

    useEffect(() => {
        const validateDescriptionOverflow = () => {
            const descripcionElement = descripcionRef.current;

            if (!descripcionElement || !producto?.descripcion) {
                setMostrarToggleDescripcion(false);
                return;
            }

            const lineHeight = Number.parseFloat(
                window.getComputedStyle(descripcionElement).lineHeight,
            );

            if (!lineHeight) {
                setMostrarToggleDescripcion(false);
                return;
            }

            const maxVisibleHeight = lineHeight * 6;
            const fullHeight = descripcionElement.scrollHeight;
            setMostrarToggleDescripcion(fullHeight > maxVisibleHeight + 1);
        };

        validateDescriptionOverflow();
        window.addEventListener("resize", validateDescriptionOverflow);

        return () => {
            window.removeEventListener("resize", validateDescriptionOverflow);
        };
    }, [producto?.descripcion]);

    const selectedVariante = useMemo(
        () =>
            productVariants.find((variant) => variant.id === selectedVarianteId) ??
            firstAvailableVariante,
        [firstAvailableVariante, productVariants, selectedVarianteId],
    );

    const selectedStock = Math.max(0, selectedVariante?.stock ?? 0);
    const minQuantity = selectedStock > 0 ? 1 : 0;

    useEffect(() => {
        setQuantity((prev) => {
            if (selectedStock === 0) {
                return 0;
            }

            if (prev < 1) {
                return 1;
            }

            return Math.min(prev, selectedStock);
        });
    }, [selectedStock]);

    if (cargandoProducto) {
        return (
            <div className="flex h-40 items-center justify-center">
                <p className="w-fit font-inter text-sm/[22px] font-semibold text-taup-gray">
                    Cargando producto...
                </p>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="flex h-40 items-center justify-center">
                <p className="w-fit font-inter text-sm/[22px] font-semibold text-taup-gray">
                    {errorProducto ?? "Producto no encontrado."}
                </p>
            </div>
        );
    }

    const handleClickDecrease = () =>
        setQuantity((prev) => {
            if (selectedStock === 0) {
                return 0;
            }

            return Math.max(1, prev - 1);
        });

    const handleClickIncrease = () =>
        setQuantity((prev) => Math.min(selectedStock, prev + 1));

    const basePrice = selectedVariante?.precio ?? 0;
    const totalPrice = formatCurrency(normalizePrice(basePrice) * quantity);
    const rating = Math.max(0, producto.valoracion ?? 0);
    const oferta =
        producto.oferta !== undefined && producto.oferta !== null
            ? String(producto.oferta)
            : undefined;
    const requiresConnectionToAddCart = Boolean(user?.id);
    const isOffline = isOfflineByNavigator();

    const getVariantLabel = (label: unknown) => {
        if (typeof label === "string") {
            return label;
        }

        if (label && typeof label === "object" && "nombre" in label) {
            const value = (label as { nombre?: unknown }).nombre;
            return typeof value === "string" ? value : "";
        }

        return "";
    };

    const handleAddToCart = async () => {
        if (!selectedVariante || quantity <= 0) {
            return;
        }

        const previousItem = cartItems.find((item) => item.varianteId === selectedVariante.id);
        const previousQty = previousItem?.quantity ?? 0;
        const optimisticPayload = {
            varianteId: selectedVariante.id,
            productId: producto.id,
            nombre: producto.nombre ?? "",
            marca: producto.marca ?? "",
            imageUrl: producto.image_url ?? "/images/cart-product.png",
            varianteLabel: selectedVariante.tamano ?? getVariantLabel(selectedVariante.tamanio),
            unitPrice: normalizePrice(selectedVariante.precio),
            quantity,
            stock: selectedVariante.stock,
        };

        dispatch({
            type: "ADD_TO_CART",
            payload: optimisticPayload,
        });

        if (user?.id) {
            setIsAddingToCart(true);

            try {
                const clienteId = user.cliente_id ?? (await resolveClienteIdByUserId(user.id));

                if (!clienteId) {
                    if (previousQty === 0) {
                        dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: {varianteId: selectedVariante.id},
                        });
                    } else {
                        dispatch({
                            type: "UPDATE_CART_QTY",
                            payload: {varianteId: selectedVariante.id, quantity: previousQty},
                        });
                    }
                    setCartErrorMessage("No se pudo identificar el cliente para guardar el carrito.");
                    setIsCartErrorModalOpen(true);
                    return;
                }

                await addItemToCart({
                    cliente_id: clienteId,
                    variante_producto_id: selectedVariante.id,
                    cantidad: quantity,
                });
            } catch (error: unknown) {
                if (previousQty === 0) {
                    dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: {varianteId: selectedVariante.id},
                    });
                } else {
                    dispatch({
                        type: "UPDATE_CART_QTY",
                        payload: {varianteId: selectedVariante.id, quantity: previousQty},
                    });
                }
                setCartErrorMessage(getAddItemCartErrorMessage(error));
                setIsCartErrorModalOpen(true);
                return;
            } finally {
                setIsAddingToCart(false);
            }

            return;
        }
    };

    return (
        <>
            <section className="px-8 lg:px-14 border-t border-app-light-gray">
                <div className="w-fit flex gap-3 md:gap-4 py-4">
                    <div className="flex items-center gap-1">
                        <p className="text-grayish-brown font-inter text-xs/5 md:text-sm/6 font-medium">
                            <Link to={ROUTES.HOME}>Inicio</Link>
                        </p>
                        <img
                            src="/images/right-icon.svg"
                            alt="icono flecha derecha"
                            className="w-3 h-3 object-contain"
                        />
                    </div>
                    <p className="text-app-black font-inter text-sm/[25px] font-medium">
                        <Link to={ROUTES.SHOP}>Tienda</Link>
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="bg-white">
                        <ProductSlider
                            productImageUrls={[producto.image_url ?? ""]}
                            etiqueta={producto.label}
                            descuento={oferta}
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-4 pb-6 border-b border-app-light-gray">
                            <div className="flex gap-[10px] items-center">
                                <div className="flex gap-0.5">
                                    {Array.from({length: rating}, (_, idx) => (
                                        <img
                                            key={idx}
                                            src="/images/star-icon.svg"
                                            alt="icono estrella"
                                            className="h-4 w-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <h1 className="text-app-gray font-poppins text-[30px]/[34px] font-medium tracking-[-0.4px]">
                                {producto.marca || ""}
                            </h1>
                            <h1 className="text-app-black font-poppins text-[40px]/[44px] font-medium tracking-[-0.4px]">
                                {producto.nombre || ""}
                            </h1>
                            <p className="text-app-black font-inter text-sm/[22px] font-normal">
                                {producto.categoria}
                            </p>
                            <div className="border-t border-app-light-gray"/>
                            <p
                                ref={descripcionRef}
                                className="text-app-gray text-base/[26px] font-inter"
                                style={
                                    descripcionExpandida
                                        ? undefined
                                        : {
                                            display: "-webkit-box",
                                            WebkitLineClamp: 6,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }
                                }
                            >
                                {producto.descripcion || ""}
                            </p>
                            {mostrarToggleDescripcion && (
                                <button
                                    type="button"
                                    onClick={() => setDescripcionExpandida((prev) => !prev)}
                                    className="mt-[18px] w-fit text-sm/[22px] font-inter font-medium text-app-black  hover:underline"
                                >
                                    {descripcionExpandida ? "Ver menos" : "Ver más"}
                                </button>
                            )}
                            <p className="text-app-black font-poppins text-[28px]/[34px] font-semibold tracking-[-0.6px]">
                                {totalPrice}
                            </p>

                            {productVariants.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {productVariants.map((variant) => {
                                            const variantLabel = variant.tamanio;
                                            const isSelected = variant.id === selectedVariante?.id;
                                            const isDisabled = !variant.activa || variant.stock <= 0;

                                            return (
                                                <button
                                                    key={variant.id}
                                                    type="button"
                                                    disabled={isDisabled}
                                                    onClick={() => {
                                                        if (!isDisabled) {
                                                            setSelectedVarianteId(variant.id);
                                                        }
                                                    }}
                                                    className={`min-w-14 rounded-md border px-3 py-2 text-sm/[22px] font-inter transition-colors ${
                                                        isSelected
                                                            ? "border-[#2A6F97] text-app-black"
                                                            : "border-[#D9D9D9] text-app-gray"
                                                    } ${isDisabled ? "cursor-not-allowed opacity-50" : "hover:border-[#2A6F97]"}`}
                                                >
                                                    {variantLabel ? `${variantLabel} ML` : "-"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-app-gray font-inter text-sm/[22px] font-normal">
                                            Disponibles
                                        </p>
                                        <p className="text-app-black font-inter text-sm/[22px] font-normal">
                                            {selectedVariante?.stock ?? 0}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {requiresConnectionToAddCart && isOffline && (
                                <p className="text-sm/[22px] font-inter font-semibold text-taup-gray">
                                    Sin conexión: para continuar y guardar en tu carrito debes reconectarte.
                                </p>
                            )}
                        </div>


                        <div className="flex items-center gap-6 pb-6">
                            <div className="flex flex-shrink-0 items-center gap-6 rounded bg-primary px-4 py-3 w-fit">
                                <button
                                    type="button"
                                    onClick={handleClickDecrease}
                                    disabled={quantity <= minQuantity}
                                >
                                    <img
                                        src="/images/minus.svg"
                                        alt="quitar uno"
                                        className="h-5 w-5"
                                    />
                                </button>
                                <p className="text-app-black font-inter text-base/[26px] font-semibold">
                                    {quantity}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClickIncrease}
                                    disabled={selectedStock === 0 || quantity >= selectedStock}
                                >
                                    <img
                                        src="/images/add.svg"
                                        alt="agregar uno"
                                        className="h-5 w-5"
                                    />
                                </button>
                            </div>

                            <button
                                type="button"
                                disabled={selectedStock === 0 || isAddingToCart || (requiresConnectionToAddCart && isOffline)}
                                onClick={handleAddToCart}
                                className="flex w-full items-center justify-center rounded-lg bg-app-black px-10 py-[10px] text-white transition-colors hover:bg-app-black/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <span
                                    className="hidden md:block text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px]">
                                    {isAddingToCart ? "Agregando..." : "Agregar al carrito"}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="block md:hidden size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isCartErrorModalOpen}
                onClose={() => setIsCartErrorModalOpen(false)}
                title="No se pudo agregar al carrito"
                description={cartErrorMessage}
                buttonText="Entendido"
                iconSrc="/images/warning.svg"
                iconAlt="Error al agregar al carrito"
            />
        </>
    );
}
