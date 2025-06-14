// src/components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  imageUrl?: string;
  label?: string;
  discount?: string;
  rating?: number;
  name?: string;
  price?: string;
  oldPrice?: string;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  label = "Nuevo",
  discount = "-50%",
  rating = 5,
  name,
  price,
  oldPrice,
  onAddToCart,
  onToggleWishlist,
}) => {
  return (
    <div>
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
          <div>
            <div className="px-3 py-1 bg-white rounded">
              <p className="text-app-black font-inter text-base font-bold uppercase">
                {label}
              </p>
            </div>
            <div className="px-3 py-1 bg-app-green rounded mt-2">
              <p className="text-white font-inter text-base font-bold uppercase">
                {discount}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleWishlist}
            className="bg-white p-1.5 rounded-3xl h-8 w-8 shadow-wishlist-icon"
          >
            <img
              src="/images/wishlist.svg"
              alt="favoritos"
              className="h-5 w-5"
            />
          </button>
        </div>
        <button
          onClick={onAddToCart}
          className="text-white text-center font-inter text-base/6 md:text-base/7 font-medium tracking-[-0.4px] bg-app-black rounded-lg w-full px-4 md:px-10 py-2 md:py-[10px]"
        >
          Agregar al carrito
        </button>
      </div>
      <div className="mt-3">
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: rating }, (_, i) => (
            <img key={i} src="/images/star-icon.svg" alt="estrella" />
          ))}
        </div>
        <h3 className="mb-2 text-app-black font-inter text-base/[26px] font-medium">
          {name}
        </h3>
        <div className="flex gap-3.5 items-center">
          <p className="text-app-black font-inter text-sm/[22px] font-semibold">
            {price}
          </p>
          {oldPrice && (
            <p className="text-app-gray font-inter text-sm/[22px] font-semibold line-through">
              {oldPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
