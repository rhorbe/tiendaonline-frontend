import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ROUTES } from "@/core/enum/common";

const Home: FC = () => {
  const heroImages = [
    "/heros/hero1.webp",
    "/heros/hero2.webp",
    "/heros/hero3.webp",
    "/heros/hero4.webp",
    "/heros/hero5.webp",
    "/heros/hero6.webp",
    "/heros/hero7.webp",
    "/heros/hero8.webp",
  ];

  const services = [
    {
      image: "/images/shipping.svg",
      title: "Envío Gratis",
      paragraph: "Desde $100.000",
    },
    {
      image: "/images/finance.svg",
      title: "Devoluciones",
      paragraph: "Garantía de 30 días",
    },
    {
      image: "/images/lock.svg",
      title: "Seguridad",
      paragraph: "Seguridad y confianza",
    },
    {
      image: "/images/call.svg",
      title: "Soporte 24/7",
      paragraph: "Atención al cliente",
    },
  ];

  return (
    <section className="px-8 lg:px-14">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        pagination={{
          el: ".swiper-pagination",
          clickable: false,
          renderBullet: function (_, className) {
            return '<span class="' + className + '">' + "</span>";
          },
        }}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoHeight={true}
        className="relative"
        loop={true}
      >
        {heroImages.map((image, idx) => (
          <SwiperSlide key={image}>
            <a href={ROUTES.SHOP}>
              <img
                src={image}
                alt={`imagen ${idx + 1}`}
                className="max-h-[536px] w-full"
              />
            </a>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination"></div>
        <div className="hidden md:block">
          <div className="swiper-button image-swiper-button-next">
            <img
              style={{
                height: "32px",
                width: "32px",
              }}
              src={"/images/arrow-right-carousel.svg"}
              alt="flecha derecha"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="swiper-button image-swiper-button-prev">
            <img
              style={{
                height: "32px",
                width: "32px",
              }}
              src={"/images/arrow-left-carousel.svg"}
              alt="flecha izquierda"
            />
          </div>
        </div>
      </Swiper>
      <div className="pt-8 pb-10 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-app-black font-poppins text-[40px]/[44px] md:text-7xl/[76px] tracking-[-0.4px] md:tracking-[-2px] font-medium">
            Un mundo de fragancias únicas
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-app-gray font-inter text-sm/[22px] md:text-base/[26px] font-normal max-w-[424px]">
            <span className="text-app-slate-gray font-inter text-base/[26px] font-semibold">
              L'Essence
            </span>{" "}
            es la tienda de perfumes online más importante de la Patagonia
            Argentina.
          </p>
        </div>
      </div>

      <div className="py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((item) => (
          <div key={item.title} className="py-12 px-8 bg-primary">
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 object-contain"
            />
            <h3 className="text-app-black font-poppins text-xl font-medium font-semibold mt-4 text-nowrap">
              {item.title}
            </h3>
            <p className="font-poppins text-sm/6 mt-3">{item.paragraph}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
