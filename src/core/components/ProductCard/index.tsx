import {useEffect, useMemo, useState} from "react";
import {VarianteProducto} from "@/core/models/VarianteProducto.ts";

interface ProductCardProps {
    imageUrl?: string;
    nuevo?: string;
    oferta?: string;
    rating?: number;
    brand?: string;
    name?: string;
    price?: number | string;
    variantes?: VarianteProducto[];
    onAddToCart?: (variante?: VarianteProducto) => void;
    onToggleWishlist?: () => void;
    onClick?: () => void;
    disableAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = (
    {
        imageUrl,
        nuevo = "",
        oferta = "",
        rating = 0,
        brand = "",
        name,
        variantes = [],
        onAddToCart,
        onToggleWishlist,
        onClick,
        disableAddToCart = false,
    }) => {
    const firstAvailableVariante = useMemo(
        () => variantes.find((variant) => variant.activa && variant.stock > 0) ?? variantes[0],
        [variantes],
    );

    const [selectedVarianteId, setSelectedVarianteId] = useState<string | undefined>(
        firstAvailableVariante?.id,
    );

    useEffect(() => {
        setSelectedVarianteId(firstAvailableVariante?.id);
    }, [firstAvailableVariante?.id]);

    const selectedVariante = useMemo(
        () => variantes.find((variant) => variant.id === selectedVarianteId) ?? firstAvailableVariante,
        [firstAvailableVariante, selectedVarianteId, variantes],
    );

    const formatPriceToARS = (price: string | number | undefined): string => {
        if (!price) return "";
        const cleanPrice =
            typeof price === "string" ? price.replace(/,/g, "") : price;
        return Number(cleanPrice).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        });
    };

    const displayedPrice = selectedVariante?.precio;
    const priceAsCurrency = formatPriceToARS(displayedPrice);

    return (
        <div
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter") onClick?.();
            }}
        >
            <div
                style={{
                    background: `url(${imageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
                className="bg-primary h-[308px] md:h-[349px] py-4 px-3 md:p-4 flex flex-col justify-between"
            >
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        {nuevo && (
                            <div className="px-3 py-1 bg-app-black rounded">
                                <p className="text-white font-inter text-base font-bold uppercase">
                                    {nuevo}
                                </p>
                            </div>
                        )}
                        {oferta && (
                            <div className="px-3 py-1 bg-app-green rounded">
                                <p className="text-white font-inter text-base font-bold uppercase">
                                    {oferta}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* TODO sacar botón o agregar funcionalidad */}
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist?.();
                    }}
                            className="bg-white p-1.5 rounded-3xl h-8 w-8 shadow-wishlist-icon"
                    >
                    </button>
                </div>
            </div>

            <div className="mt-1.5">
                <div className="flex gap-0.5 mb-2">
                    {Array.from({length: rating}, (_, i) => (
                        <img key={i} src="/images/star-icon.svg" alt="estrella"/>
                    ))}
                </div>
                <h3 className="mb-2 text-app-gray font-inter text-base/[24px] font-medium">
                    {brand}
                </h3>
                <h3 className="mb-2 text-app-black font-inter text-base/[26px] font-medium">
                    {name}
                </h3>
                {variantes.length > 0 && (
                    <div className="flex gap-2 mb-3">
                        {variantes.map((variant) => {
                            const variantLabel = variant.tamanio;
                            const isSelected = variant.id === selectedVariante?.id;
                            const isDisabled = !variant.activa || variant.stock <= 0;

                            return (
                                <button
                                    key={variant.id}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isDisabled) {
                                            setSelectedVarianteId(variant.id);
                                        }
                                    }}
                                    className={`min-w-14 px-3 py-2 rounded-md border text-sm/[22px] font-inter transition-colors ${
                                        isSelected
                                            ? "border-[#2A6F97] text-app-black"
                                            : "border-[#D9D9D9] text-app-gray"
                                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#2A6F97]"}`}
                                >
                                    {variantLabel ? `${variantLabel} ML` : "-"}
                                </button>
                            );
                        })}
                    </div>
                )}
                <div className="flex gap-3.5 items-center mb-3">
                    <p className="text-app-black font-inter text-lg/[28px] font-semibold">
                        {priceAsCurrency}
                    </p>

                </div>

                <button
                    disabled={disableAddToCart}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (disableAddToCart) {
                            return;
                        }
                        onAddToCart?.(selectedVariante);
                    }}
                    className="text-white text-center font-inter text-base/6 md:text-base/7 font-medium tracking-[-0.4px] bg-app-black rounded-lg w-full px-4 md:px-10 py-2 md:py-[10px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
