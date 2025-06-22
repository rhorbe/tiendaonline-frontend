import { Navigation, Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";

interface ProductSliderProps {
  productImageUrls?: string[];
}
const ProductSlider: React.FC<ProductSliderProps> = ({ productImageUrls }) => {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    if (controlledSwiper) {
      controlledSwiper.slideTo(index);
    }
  };

  return (
    <div>
      <Swiper
        slidesPerView={1}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Navigation, Controller]}
        onSwiper={setControlledSwiper}
        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        autoHeight={true}
        className="relative"
      >
        {(productImageUrls ?? []).map((imgSrc, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[414px] md:h-[729px] w-full bg-primary">
              <div className="absolute top-6 md:top-8 left-6 md:left-8">
                <div className="px-4 py-2 bg-white rounded">
                  <p className="text-app-black font-inter text-base font-bold uppercase">
                    New
                  </p>
                </div>
                <div className="px-4 py-2 bg-app-green rounded mt-2">
                  <p className="text-white font-inter text-base font-bold uppercase">
                    -50%
                  </p>
                </div>
              </div>
              <img
                src={imgSrc}
                alt={"Product Img"}
                className="object-contain object-center h-auto max-h-full w-full"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
        <div className="block">
          <div className="swiper-button image-swiper-button-next">
            <img
              style={{
                height: "32px",
                width: "32px",
              }}
              src={"/images/arrow-right-carousel.svg"}
              alt="arrow right"
            />
          </div>
        </div>
        <div className="block">
          <div className="swiper-button image-swiper-button-prev">
            <img
              style={{
                height: "32px",
                width: "32px",
              }}
              src={"/images/arrow-left-carousel.svg"}
              alt="arrow left"
            />
          </div>
        </div>
      </Swiper>
      <div className="hidden md:grid grid-cols-3 gap-6 mt-6">
        {(productImageUrls ?? []).map((imgSrc, idx) => (
          <button
            key={imgSrc}
            type="button"
            onClick={() => handleThumbnailClick(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleThumbnailClick(idx);
              }
            }}
            className={`h-[167px] w-full max-w-full cursor-pointer focus:outline-none ${
              idx === activeIndex ? "border-2 border-blue-500" : ""
            }`} // Highlight active
            aria-label={`Show image ${idx + 1}`}
            tabIndex={0}
          >
            <img
              src={imgSrc}
              alt={`Product Thumbnail ${idx + 1}`}
              className="object-cover object-center h-full w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ProductSlider;
