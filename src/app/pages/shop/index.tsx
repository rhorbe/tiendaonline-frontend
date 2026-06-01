import {fetchBrands} from "@/core/api/marcasApi.ts";
import {fetchCategorias} from "@/core/api/categoriasApi.ts";
import {fetchProducts, ProductFilters} from "@/core/api/productosApi.ts";

import ProductCard from "@/core/components/ProductCard";
import {Marca} from "@/core/models/Marca.ts";
import {Categoria} from "@/core/models/Categoria.ts";
import {useCallback, useEffect, useState} from "react";
import {ROUTES} from "@/core/enum/common";
import {useProductContext} from "@/store/useProductContext";
import {normalizePrice} from "@/store/productContext";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "@/store/useAuth";
import {
    addItemToCart,
    getAddItemCartErrorMessage,
    resolveClienteIdByUserId,
} from "@/core/api/carritoApi";
import Modal from "@/core/components/Modal";
import {getOfflineErrorFromUnknown, isOfflineByNavigator} from "@/core/api/networkError";
import "@/core/components/custom-scrollbar.css";
import "./shop.css";

export default function ShopPage() {
    const {state, dispatch} = useProductContext();
    const navigate = useNavigate();
    const {user} = useAuth();
    const [isCartErrorModalOpen, setIsCartErrorModalOpen] = useState(false);
    const [cartErrorMessage, setCartErrorMessage] = useState("");

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

    const [loading, setLoading] = useState(true);
    const [productsError, setProductsError] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
    const [selectedFeatured, setSelectedFeatured] = useState(false);

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCategories, setLoadingCategorias] = useState(true);
    const [categoryError, setCategoriaError] = useState<string | null>(null);

    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [loadingBrands, setLoadingMarcas] = useState(true);
    const [brandError, setMarcaError] = useState<string | null>(null);

    const loadProducts = useCallback((filters?: ProductFilters) => {
        setLoading(true);
        setProductsError(null);

        fetchProducts(filters)
            .then((response) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: {
                        productos: response.data,
                        meta: response.meta,
                    },
                });
            })
            .catch((err) => {
                console.error("Error recuperando productos:", err);
                setProductsError(
                    getOfflineErrorFromUnknown(err, "cargar productos") ??
                    "No se pudieron cargar los productos.",
                );
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    const getCurrentFilters = useCallback(
        (overrides?: ProductFilters): ProductFilters => ({
            categoriaId: selectedCategoryId ?? undefined,
            marcaId: selectedBrandId ?? undefined,
            ...(selectedFeatured ? {destacado: true} : {}),
            ...overrides,
        }),
        [selectedBrandId, selectedCategoryId, selectedFeatured],
    );

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleCategoryClick = (categoriaId: string) => {
        setSelectedCategoryId(categoriaId);
        loadProducts(getCurrentFilters({categoriaId}));
    };

    const handleBrandClick = (marcaId: string) => {
        setSelectedBrandId(marcaId);
        loadProducts(getCurrentFilters({marcaId}));
    };

    const handleClearAllFilters = () => {
        if (!selectedCategoryId && !selectedBrandId && !selectedFeatured) {
            return;
        }

        setSelectedCategoryId(null);
        setSelectedBrandId(null);
        setSelectedFeatured(false);
        loadProducts();
    };

    const hasActiveFilters = Boolean(selectedCategoryId || selectedBrandId || selectedFeatured);
    const hasMoreProducts = (state.meta?.total ?? 0) > (state.meta?.to ?? 0);
    const emptyAfterFilters = hasActiveFilters && state.productos.length === 0;
    const isOffline = isOfflineByNavigator();
    const requiresConnectionToAddCart = Boolean(user?.id);

    const handleProductClick = (id: string) => {
        navigate(ROUTES.PRODUCT.replace(":id", String(id)));
    };

    const loadCategorias = useCallback(() => {
        setLoadingCategorias(true);
        setCategoriaError(null);

        fetchCategorias()
            .then((data) => setCategorias(data))
            .catch((err) => {
                console.error("Error recuperando categorías:", err);
                setCategorias([]);
                setCategoriaError("No se pudieron cargar las categorías.");
            })
            .finally(() => setLoadingCategorias(false));
    }, []);

    const loadMarcas = useCallback(() => {
        setLoadingMarcas(true);
        setMarcaError(null);

        fetchBrands()
            .then((data) => setMarcas(data))
            .catch((err) => {
                console.error("Error recuperando marcas:", err);
                setMarcas([]);
                setMarcaError("No se pudieron cargar las marcas.");
            })
            .finally(() => setLoadingMarcas(false));
    }, []);

    useEffect(() => {
        loadCategorias();
        loadMarcas();
    }, [loadCategorias, loadMarcas, /*loadTamanios*/]);


    return (
        <section className="px-8 lg:px-14">
            <div
                className="shop-page-banner-bg min-h-[208px] md:h-[208px] flex justify-center items-center">
                <div className="max-w-fit flex flex-col items-center gap-4 md:gap-6">
                    <h1 className="text-app-black font-poppins text-[40px]/[44px] md:text-[54px]/[58px] tracking-[-0.4px] md:tracking-[-1px] font-medium">
                        Tienda
                    </h1>
                    <p className="text-app-black font-inter text-center text-base/[26px] md:text-xl/[32px] font-normal">
                        Un mundo de fragancias únicas
                    </p>

                    <div className="w-fit flex gap-4">
                        <div className="flex items-center gap-1">
                            <p className="text-grayish-brown font-inter text-sm/6 font-medium">
                                <Link to={ROUTES.HOME}>Inicio</Link>
                            </p>
                            <img
                                src="/images/right-icon.svg"
                                alt="icono derecha"
                                className="w-3 h-3 object-contain"
                            />
                        </div>
                        <p className="text-app-black font-inter text-sm/[25px] font-medium">
                            Tienda
                        </p>
                    </div>
                </div>
            </div>
            <div className="pt-8 md:pt-[60px] pb-[100px] grid md:grid-cols-4 lg:grid-cols-[3fr_13fr] gap-6">
                <div
                    className="flex md:hidden border-y border-app-light-gray col-span-3 justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/filter.svg"
                            alt="icono filtro"
                            className="h-6 w-6"
                        />
                        <p className="text-app-black font-inter text-base/[28px] md:text-xl/8 font-semibold">
                            Filtro
                        </p>
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            aria-label="Expandir filtros"
                            className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
                            {/* SVG */}
                        </button>
                        <button
                            type="button"
                            aria-label="Contraer filtros"
                            className="py-3 px-3 bg-primary flex justify-center items-center border-t border-app-light-gray rotate-90">
                            {/* SVG */}
                        </button>
                    </div>
                </div>

                <div className="col-span-1 hidden md:flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/filter.svg"
                                alt="icono filtro"
                                className="h-6 w-6"
                            />
                            <p className="text-app-black font-inter text-xl/8 font-semibold">
                                Filtro
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleClearAllFilters}
                            disabled={!hasActiveFilters}
                            className="py-1.5 px-5 rounded-[80px] border border-app-black text-center font-inter text-sm/[22px] font-semibold text-app-black tracking-[-0.2px] transition-colors hover:bg-app-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4 rounded-lg py-3">
                            <div>
                                <div
                                    id="destacados-label"
                                    className={`font-inter w-fit text-sm/[22px] font-semibold ${
                                    selectedFeatured ? "text-app-black" : "text-app-gray"
                                }`}>
                                    <span>Destacados</span>
                                </div>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    id="destacados-toggle"
                                    type="checkbox"
                                    className="sr-only peer"
                                    aria-labelledby="destacados-label"
                                    checked={selectedFeatured}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        const nextFilters: ProductFilters = {
                                            categoriaId: selectedCategoryId ?? undefined,
                                            marcaId: selectedBrandId ?? undefined,
                                        };

                                        if (checked) {
                                            nextFilters.destacado = true;
                                        }

                                        setSelectedFeatured(checked);
                                        loadProducts(nextFilters);
                                    }}
                                />
                                <span
                                    className="w-12 h-5 bg-app-gray rounded-full peer peer-focus:ring-2 peer-focus:ring-app-black/30 peer-checked:bg-app-black transition-colors"></span>
                                <span
                                    className="absolute left-1 top-1 h-3 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></span>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-app-black font-inter text-base/[26px] font-semibold">
                            CATEGORÍAS
                        </h1>
                        {loadingCategories ? (
                            <div className="flex justify-center items-center h-40">
                                <p className="font-inter w-fit text-sm/[22px] font-semibold  text-taup-gray">
                                    Cargando...
                                </p>
                            </div>
                        ) : categoryError ? (
                            <div className="flex flex-col gap-3 items-start">
                                <p className="font-inter text-sm/[22px] font-semibold text-taup-gray">
                                    {categoryError}
                                </p>
                            </div>
                        ) : (
                            <div
                                className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-category-scrollbar">
                                {categorias.length > 0 ? (
                                    categorias.map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => handleCategoryClick(c.id)}
                                            className={`font-inter w-fit text-sm/[22px] font-semibold ${
                                                selectedCategoryId === c.id ? "text-app-black" : "text-app-gray"
                                            }`}
                                        >
                                            {c.nombre}
                                        </button>
                                    ))
                                ) : (
                                    <p className="font-inter w-fit text-sm/[22px] font-semibold text-taup-gray">
                                        Sin categorías disponibles.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-app-black font-inter text-base/[26px] font-semibold">
                            MARCAS
                        </h1>
                        {loadingBrands ? (
                            <div className="flex justify-center items-center h-40">
                                <p className="font-inter w-fit text-sm/[22px] font-semibold  text-taup-gray">
                                    Cargando...
                                </p>
                            </div>
                        ) : brandError ? (
                            <div className="flex flex-col gap-3 items-start">
                                <p className="font-inter text-sm/[22px] font-semibold text-taup-gray">
                                    {brandError}
                                </p>
                            </div>
                        ) : (
                            <div
                                className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-category-scrollbar">
                                {marcas.length > 0 ? (
                                    marcas.map((b) => (
                                        <button
                                            key={b.id}
                                            type="button"
                                            onClick={() => handleBrandClick(b.id)}
                                            className={`font-inter w-fit text-sm/[22px] font-semibold ${
                                                selectedBrandId === b.id ? "text-app-black" : "text-app-gray"
                                            }`}
                                        >
                                            {b.name}
                                        </button>
                                    ))
                                ) : (
                                    <p className="font-inter w-fit text-sm/[22px] font-semibold text-taup-gray">
                                        Sin marcas disponibles.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:col-span-3 lg:col-span-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <p className="font-inter w-fit text-sm/[22px] font-semibold  text-taup-gray">
                                Cargando...
                            </p>
                        </div>
                    ) : productsError ? (
                        <div className="flex flex-col items-center justify-center gap-3 h-40">
                            <p className="font-inter text-sm/[22px] font-semibold text-taup-gray text-center">
                                {productsError}
                            </p>
                            <button
                                type="button"
                                onClick={() => loadProducts(getCurrentFilters())}
                                className="py-1.5 px-5 rounded-[80px] border border-app-black text-center font-inter text-sm/[22px] font-semibold text-app-black tracking-[-0.2px] transition-colors hover:bg-app-black hover:text-white"
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : emptyAfterFilters ? (
                        <div className="flex flex-col items-center justify-center gap-3 h-40">
                            <p className="font-inter text-sm/[22px] font-semibold text-taup-gray text-center">
                                No se encontraron productos con los filtros seleccionados.
                            </p>
                            <button
                                type="button"
                                onClick={handleClearAllFilters}
                                className="py-1.5 px-5 rounded-[80px] border border-app-black text-center font-inter text-sm/[22px] font-semibold text-app-black tracking-[-0.2px] transition-colors hover:bg-app-black hover:text-white"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                                {state.productos.map((p) => (
                                    <div key={p.id} className="cursor-pointer">
                                        {(() => {
                                            const productVariants = p.variantes ?? [];
                                            const defaultVariant =
                                                productVariants.find((variant) => variant.activa && variant.stock > 0) ??
                                                productVariants[0];

                                            return (
                                                <ProductCard
                                                    nuevo={p.nuevo ? "Nuevo" : undefined}
                                                    oferta={p.oferta ? "Oferta" : undefined}
                                                    imageUrl={p.image_url ?? ""}
                                                    brand={p.marca ?? ""}
                                                    name={p.nombre}
                                                    price={defaultVariant?.precio ?? 0}
                                                    variantes={productVariants}
                                                    rating={Math.max(0, Math.min(5, Math.round(p.valoracion ?? 0)))}
                                                    onClick={() => handleProductClick(p.id)}
                                                    disableAddToCart={requiresConnectionToAddCart && isOffline}
                                                    onAddToCart={async (selectedVariante) => {
                                                        if (!selectedVariante) {
                                                            return;
                                                        }

                                                        const previousItem = state.cartItems.find(
                                                            (item) => item.varianteId === selectedVariante.id,
                                                        );
                                                        const previousQty = previousItem?.quantity ?? 0;
                                                        const optimisticPayload = {
                                                            varianteId: selectedVariante.id,
                                                            productId: p.id,
                                                            nombre: p.nombre ?? "",
                                                            marca: p.marca ?? "",
                                                            imageUrl: p.image_url ?? "/images/cart-product.png",
                                                            varianteLabel:
                                                                selectedVariante.tamano ??
                                                                getVariantLabel(selectedVariante.tamanio),
                                                            unitPrice: normalizePrice(selectedVariante.precio),
                                                            quantity: 1,
                                                            stock: selectedVariante.stock,
                                                        };

                                                        dispatch({
                                                            type: "ADD_TO_CART",
                                                            payload: optimisticPayload,
                                                        });

                                                        if (user?.id) {
                                                            try {
                                                                const clienteId =
                                                                    user.cliente_id ?? (await resolveClienteIdByUserId(user.id));

                                                                if (!clienteId) {
                                                                    if (previousQty === 0) {
                                                                        dispatch({
                                                                            type: "REMOVE_FROM_CART",
                                                                            payload: {varianteId: selectedVariante.id},
                                                                        });
                                                                    } else {
                                                                        dispatch({
                                                                            type: "UPDATE_CART_QTY",
                                                                            payload: {
                                                                                varianteId: selectedVariante.id,
                                                                                quantity: previousQty,
                                                                            },
                                                                        });
                                                                    }
                                                                    setCartErrorMessage("No se pudo identificar el cliente para guardar el carrito.");
                                                                    setIsCartErrorModalOpen(true);
                                                                    return;
                                                                }

                                                                await addItemToCart({
                                                                    cliente_id: clienteId,
                                                                    variante_producto_id: selectedVariante.id,
                                                                    cantidad: 1,
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
                                                                        payload: {
                                                                            varianteId: selectedVariante.id,
                                                                            quantity: previousQty,
                                                                        },
                                                                    });
                                                                }
                                                                setCartErrorMessage(getAddItemCartErrorMessage(error));
                                                                setIsCartErrorModalOpen(true);
                                                                return;
                                                            }

                                                            return;
                                                        }
                                                    }}
                                                />
                                            );
                                        })()}
                                    </div>
                                ))}
                            </div>

                            {hasMoreProducts && (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        aria-label="Cargar más productos de la tienda"
                                        className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
                                        Ver más
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {requiresConnectionToAddCart && isOffline && (
                <div className="mb-6">
                    <p className="text-center text-sm/[22px] font-inter font-semibold text-taup-gray">
                        Sin conexión: para continuar y guardar en tu carrito debes reconectarte.
                    </p>
                </div>
            )}
            <Modal
                isOpen={isCartErrorModalOpen}
                onClose={() => setIsCartErrorModalOpen(false)}
                title="No se pudo agregar al carrito"
                description={cartErrorMessage}
                buttonText="Entendido"
                iconSrc="/images/warning.svg"
                iconAlt="Error al agregar al carrito"
            />
        </section>
    );
}
