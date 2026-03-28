import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "@/core/enum/common";

const HomePage = lazy(() => import("../pages/home"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const RegisterPage = lazy(() => import("../pages/auth/register"));
const ShopPage = lazy(() => import("../pages/shop"));
const ProductPage = lazy(() => import("../pages/product"));
const CartPage = lazy(() => import("../pages/cart"));
const CheckOutPage = lazy(() => import("../pages/checkout"));
const OrderCompletePage = lazy(() => import("../pages/order"));
const ProfilePage = lazy(() => import("../pages/profile"));
const ContactPage = lazy(() => import("../pages/contact"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/password"));
const OtpPage = lazy(() => import("../pages/auth/otp"));
const ErrorPage = lazy(() => import("../pages/error"));

const routeFallback = (
  <div className="min-h-[40vh] w-full flex items-center justify-center text-app-gray">
    Cargando...
  </div>
);

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={routeFallback}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.SHOP} element={<ShopPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckOutPage />} />
        <Route path={ROUTES.ORDER} element={<OrderCompletePage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.OTP_PAGE} element={<OtpPage />} />
        <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
