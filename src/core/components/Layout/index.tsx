import { FC, Fragment, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';
import { ROUTES } from '@/core/enum/common';

type LayoutProps = {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const noLayoutRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD, ROUTES.OTP_PAGE];

  
  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname as ROUTES);

  return (
    <Fragment>
      {!isNoLayoutRoute && <Header />}
      <main className='2xl:container mx-auto'>
        {children}
      </main>
      {!isNoLayoutRoute && <Footer />}
    </Fragment>
  );
}

export default Layout;
