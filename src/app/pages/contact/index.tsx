import Button from "@/core/components/Button/Button";

export default function ContactPage() {
  const items = [
    {
      icon: "/images/store.svg",
      title: "Dirección",
      paragraph: "9 de Julio 25, U9100 Trelew, Chubut",
    },
    {
      icon: "/images/call.svg",
      title: "Contáctanos",
      paragraph: "280 442-1080",
    },
    {
      icon: "/images/mail.svg",
      title: "Email",
      paragraph: "hola@lessence.com",
    },
  ];

  const services = [
    {
      image: "/images/shipping.svg",
      title: "Envío gratis",
      paragraph: "Compras superiores a $100.000",
    },
    {
      image: "/images/finance.svg",
      title: "Devolución de dinero",
      paragraph: "Garantía de 30 días",
    },
    {
      image: "/images/lock.svg",
      title: "Pagos seguros",
      paragraph: "Protegido por Mercado Pago",
    },
    {
      image: "/images/call.svg",
      title: "Soporte 24/7",
      paragraph: "Soporte telefónico y por email",
    },
  ];
  return (
    <>
      <section className="px-8 lg:px-14 py-20 space-y-12">
        <div className="space-y-10">
          <p className="text-app-black font-poppins text-xl/7 md:text-[40px]/[44px] font-medium tracking-[-0.4px] text-center">
            Contáctanos
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="bg-primary pt-4 pb-12 px-8">
                <div className="flex justify-center mb-4">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-8 h-8 object-contain object-center"
                  />
                </div>
                <p className="font-inter text-base/4 font-bold uppercase text-center mb-2">
                  {item.title}
                </p>
                <p className="text-app-black font-inter text-base/[26px] font-semibold text-center max-w-[293px] mx-auto">
                  {item.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-7">
          <form className="space-y-6 w-full">
            <div className="space-y-3 w-full">
              <label
                htmlFor="fullname"
                className="text-app-gray font-inter text-sm/3 font-bold uppercase"
              >
                Nombre completo
              </label>
              <input
                placeholder="Nombre completo"
                type="text"
                name="fullname"
                id="fullname"
                className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
              />
            </div>
            <div className="space-y-3 w-full">
              <label
                htmlFor="email"
                className="text-app-gray font-inter text-sm/3 font-bold uppercase"
              >
                Correo electrónico
              </label>
              <input
                placeholder="Tu correo"
                type="email"
                name="email"
                id="email"
                className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
              />
            </div>
            <div className="space-y-3 w-full">
              <label
                htmlFor="message"
                className="text-app-gray font-inter text-sm/3 font-bold uppercase"
              >
                Mensaje
              </label>
              <textarea
                placeholder="Tu mensaje"
                rows={6}
                name="message"
                id="message"
                className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md"
              />
            </div>
            <Button text="Enviar mensaje" className="max-w-fit" />
          </form>
          <div className="h-full">
            <img
              src="/images/map2.png"
              alt="Ubicación"
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>
      </section>
      <div className="grid sm:grid-cols-2 md:grid-cols-4">
        {services.map((item, idx) => (
          <div key={idx} className="py-12 px-8 bg-primary">
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 object-contain"
            />
            <h3 className="text-app-black font-poppins text-xl font-medium mt-4 text-nowrap">
              {item.title}
            </h3>
            <p className="font-poppins text-sm/6 mt-3">
              {item.paragraph}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
