import { fetchBrands } from "@/core/api/brandsApi";
import { fetchCategories } from "@/core/api/categoriesApi";
import { fetchProducts } from "@/core/api/productsApi";
import { fetchSizes } from "@/core/api/sizesApi";
import ProductCard from "@/core/components/ProductCard";
import { Brand } from "@/core/models/Brand";
import { Category } from "@/core/models/Category";
import { Size } from "@/core/models/Size";
import { useEffect, useState } from "react";
import { ROUTES } from "@/core/enum/common";
import { useProductContext } from "@/store/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const { state, dispatch } = useProductContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  const [sizes, setSizes] = useState<Size[]>([]);
  const [loadingSizes, setLoadingSizes] = useState(true);

  useEffect(() => {
    if (state.products.length === 0) {
      fetchProducts()
        .then((data) => {
          dispatch({ type: "SET_PRODUCTS", payload: data });
        })
        .catch((err) => console.error("Error recuperando productos:", err))
        .finally(() => setLoading(false));
    }
  }, [state.products.length, dispatch]);

  const handleProductClick = (id: string) => {
    navigate(ROUTES.PRODUCT.replace(":id", String(id)));
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error recuperando categorías:", err))
      .finally(() => setLoadingCategories(false));
  }, []);

  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error recuperando marcas:", err))
      .finally(() => setLoadingBrands(false));
  }, []);

  useEffect(() => {
    fetchSizes()
      .then((data) => setSizes(data))
      .catch((err) => console.error("Error recuperando tallas:", err))
      .finally(() => setLoadingSizes(false));
  }, []);

  // const handleAddToCart = (id: number) => {
  //   console.log("Agregar al carrito:", id);
  // };

  // const handleToggleWishlist = (id: number) => {
  //   console.log("Toggle wishlist:", id);
  // };
  return (
    <section className="px-8 lg:px-14">
      <div className="shop-page-banner-bg min-h-[208px] md:h-[292px] max-h-[292px] flex justify-center items-center">
        <div className="max-w-fit flex flex-col items-center gap-4 md:gap-6">
          <div className="w-fit flex gap-4">
            <div className="flex items-center gap-1">
              <p className="text-grayish-brown font-inter text-sm/6 font-medium">
                <a href={ROUTES.HOME}>Inicio</a>
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
          <h1 className="text-app-black font-poppins text-[40px]/[44px] md:text-[54px]/[58px] tracking-[-0.4px] md:tracking-[-1px] font-medium">
            Tienda
          </h1>
          <p className="text-app-black font-inter text-center text-base/[26px] md:text-xl/[32px] font-normal">
            Un mundo de perfumes.
          </p>
        </div>
      </div>
      <div className="pt-8 md:pt-[60px] pb-[100px] grid md:grid-cols-4 gap-6">
        <div className="flex md:hidden border-y border-app-light-gray col-span-3 justify-between items-center py-2">
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
            <button className="py-2 px-3 bg-primary flex justify-center items-center border-r border-app-light-gray">
              {/* SVG */}
            </button>
            <button className="py-3 px-3 bg-primary flex justify-center items-center border-t border-app-light-gray rotate-90">
              {/* SVG */}
            </button>
          </div>
        </div>

        <div className="col-span-1 hidden md:flex flex-col gap-6">
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
            ) : (
              <div className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-categroy-scrollbar">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    className={`font-inter w-fit text-sm/[22px] font-semibold text-app-gray`}
                  >
                    {c.name}
                  </button>
                ))}
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
            ) : (
              <div className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-categroy-scrollbar">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    className="font-inter w-fit text-sm/[22px] font-semibold text-app-gray"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-app-black font-inter text-base/[26px] font-semibold">
              TAMAÑOS
            </h1>
            {loadingSizes ? (
              <div className="flex justify-center items-center h-40">
                <p className="font-inter w-fit text-sm/[22px] font-semibold  text-taup-gray">
                  Cargando...
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[208px] overflow-y-scroll custom-categroy-scrollbar">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    className="font-inter w-fit text-sm/[22px] font-semibold text-app-gray"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-app-black font-inter text-base/[26px] font-semibold mb-4">
              PRECIO
            </h1>
            <div className="flex flex-col gap-2">
              {[
                "Todos los precios",
                "$0,00 - 99,99",
                "$100,00 - 199,99",
                "$200,00 - 299,99",
                "$300,00 - 399,99",
                "$400,00+",
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <p className="text-app-gray font-inter text-sm/[22px] font-semibold">
                    {item}
                  </p>
                  <input
                    id="accept"
                    type="checkbox"
                    className="w-6 h-6 text-gray-500 border-2 rounded focus:ring-0 checked:bg-app-black checked:border-[#6C7275] cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="font-inter w-fit text-sm/[22px] font-semibold  text-taup-gray">
                Cargando...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                {state.products.map((p) => (
                  <div key={p.id} className="cursor-pointer">
                    <ProductCard
                      imageUrl={p.image_url ?? ""}
                      name={p.name}
                      price={p.price}
                      rating={5}
                      onClick={() => handleProductClick(p.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="py-1.5 px-10 rounded-[80px] border border-app-black text-center font-inter text-base/7 font-semibold tracking-[-0.4px]">
                  Ver más
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
