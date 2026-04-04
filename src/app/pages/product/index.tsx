import ProductSlider from "@/core/components/ProductSlider";
import { Link, useParams } from "react-router-dom";
import { useProductContext } from "@/store/useProductContext";
import { ROUTES } from "@/core/enum/common";
import { useEffect, useMemo, useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const { state } = useProductContext();
  const producto = state.productos.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);

  const handleClickDecrease = () =>
    setQuantity((prev) => (prev <= 1 ? prev : prev - 1));

  const handleClickIncrease = () => setQuantity((prev) => prev + 1);

  const cleanPrice = (price: string | number) =>
    typeof price === "string" ? Number(price.replace(/,/g, "")) : price;

  const priceAsCurrency = (price: number) =>
    price.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });

  if (!producto) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="font-inter w-fit text-sm/[22px] font-semibold  text-taup-gray">
          Producto no encontrado.
        </p>
      </div>
    );
  }

  const productVariants = producto.variantes ?? producto.variante ?? [];

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

  const selectedVariante = useMemo(
    () =>
      productVariants.find((variant) => variant.id === selectedVarianteId) ??
      firstAvailableVariante,
    [firstAvailableVariante, productVariants, selectedVarianteId],
  );

  const basePrice = selectedVariante?.precio ?? 50000;

  const categoriaNombre =
    typeof producto.categoria === "string"
      ? producto.categoria
      : producto.categoria?.nombre ?? producto.categoria_id ?? "-";

  return (
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
          <ProductSlider productImageUrls={[producto.image_url ?? ""]} />
        </div>
        <div>
          <div className="space-y-4 pb-6 border-b border-app-light-gray">
            <div className="flex gap-[10px] items-center">
              <div className="flex gap-0.5">
                {Array.from({ length: producto.valoracion }, (_, idx) => (
                  <img
                    key={idx}
                    src="/images/star-icon.svg"
                    alt="icono estrella"
                    className="h-4 w-4"
                  />
                ))}
              </div>
            </div>
            <h1 className="text-app-black font-poppins text-[40px]/[44px] font-medium tracking-[-0.4px]">
              {producto.nombre }
            </h1>
            <p className="text-app-gray text-base/[26px] font-inter">
              {producto.descripcion}
            </p>
            <div className="flex gap-3 items-center">
              <p className="text-app-black font-poppins text-[28px]/[34px] font-semibold tracking-[-0.6px]">
                {priceAsCurrency(cleanPrice(basePrice) * quantity)}
              </p>
            </div>
            {productVariants.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {productVariants.map((variant) => {
                  const variantLabel = variant.tamanio?.nombre ?? variant.tamano;
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

            <div className="py-6">
              <div className="py-8">
                <div className="flex gap-6 items-center mb-4">
                  <div className="flex flex-shrink-0 gap-6 items-center bg-primary rounded py-3 px-4 w-fit">
                    <button onClick={handleClickDecrease}>
                      <img
                        src="/images/minus.svg"
                        alt="menos"
                        className="h-5 w-5"
                      />
                    </button>
                    <p className="text-app-black font-inter font-semibold text-base/[26px]">
                      {quantity}
                    </p>
                    <button onClick={handleClickIncrease}>
                      <img
                        src="/images/add.svg"
                        alt="más"
                        className="h-5 w-5"
                      />
                    </button>
                  </div>
                  <button className="flex w-full justify-center items-center gap-2 py-[10px] px-10 rounded-lg border border-app-black">
                    <img
                      src="/images/wishlist-dark.svg"
                      alt="favoritos"
                      className="h-6 w-6"
                    />
                    <p className="text-app-black font-inter text-lg/8 font-medium tracking-[-0.4px]">
                      Favoritos
                    </p>
                  </button>
                </div>
                <button className="text-white text-center font-inter text-base font-medium leading-[28px] tracking-[-0.4px] bg-app-black rounded-lg w-full px-10 py-[10px]">
                  Agregar al carrito
                </button>
              </div>
              <div className="py-6 border-t space-y-2 border-app-light-gray">
                <div className="flex items-center gap-24">
                  <p className="text-app-gray font-inter text-xs/5 font-normal">
                    CATEGORÍA
                  </p>
                  <p className="text-app-black font-inter text-xs/5 font-normal">
                    {categoriaNombre}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
