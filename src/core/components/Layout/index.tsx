import { FC, Fragment, ReactNode, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';
import { ROUTES } from '@/core/enum/common';
import NetworkStatusBanner from '@/core/components/NetworkStatusBanner';

type LayoutProps = {
  children: ReactNode;
}

const APP_NAME = "Essences";
const PAGE_TITLES: Array<{ path: string; title: string }> = [
  { path: ROUTES.SHOP, title: "Tienda" },
  { path: ROUTES.PRODUCT, title: "Producto" },
  { path: ROUTES.CART, title: "Carrito" },
  { path: ROUTES.CHECKOUT, title: "Checkout" },
  { path: ROUTES.SHIPPING, title: "Envío" },
  { path: ROUTES.ORDER, title: "Pedido" },
  { path: ROUTES.PROFILE, title: "Perfil" },
  { path: ROUTES.CONTACT, title: "Contacto" },
  { path: ROUTES.LOGIN, title: "Iniciar sesión" },
  { path: ROUTES.REGISTER, title: "Registrarse" },
  { path: ROUTES.FORGOT_PASSWORD, title: "Recuperar contraseña" },
  { path: ROUTES.OTP_PAGE, title: "Verificación" },
  { path: ROUTES.ERROR_PAGE, title: "Error" },
];

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const noLayoutRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD, ROUTES.OTP_PAGE];

  useEffect(() => {
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  useEffect(() => {
    const matchedPage = PAGE_TITLES.find(({ path }) => matchPath({ path, end: true }, location.pathname));
    document.title = matchedPage ? `${APP_NAME} - ${matchedPage.title}` : APP_NAME;
  }, [location.pathname]);


  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname as ROUTES);

  return (
    <Fragment>
      <NetworkStatusBanner />
      {!isNoLayoutRoute && <Header />}
      <main className='2xl:container mx-auto'>
        {children}
      </main>
      {!isNoLayoutRoute && <Footer />}
    </Fragment>
  );
}

export default Layout;
