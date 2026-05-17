import {FC, Suspense, lazy} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {ROUTES} from "@/core/enum/common";
import RequireAuth from "./RequireAuth";

const HomePage = lazy(() => import("../pages/home"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const RegisterPage = lazy(() => import("../pages/auth/register"));
const ShopPage = lazy(() => import("../pages/shop"));
const ProductPage = lazy(() => import("../pages/product"));
const CartPage = lazy(() => import("../pages/cart"));
const ShippingPage = lazy(() => import("../pages/shipping"));
const CheckOutPage = lazy(() => import("../pages/checkout"));
const OrderCompletePage = lazy(() => import("../pages/order"));
const ProfilePage = lazy(() => import("../pages/profile"));
const ContactPage = lazy(() => import("../pages/contact"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/password"));
const OtpPage = lazy(() => import("../pages/auth/otp"));
const ErrorPage = lazy(() => import("../pages/error"));

type RouteConfig = {
    path: string;
    element: JSX.Element;
};

const publicRoutes: RouteConfig[] = [
    {path: ROUTES.HOME, element: <HomePage/>},
    {path: ROUTES.LOGIN, element: <LoginPage/>},
    {path: ROUTES.REGISTER, element: <RegisterPage/>},
    {path: ROUTES.SHOP, element: <ShopPage/>},
    {path: ROUTES.PRODUCT, element: <ProductPage/>},
    {path: ROUTES.CONTACT, element: <ContactPage/>},
    {path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage/>},
    {path: ROUTES.OTP_PAGE, element: <OtpPage/>},
    {path: ROUTES.ERROR_PAGE, element: <ErrorPage/>},
];

const protectedRoutes: RouteConfig[] = [
    {path: ROUTES.CART, element: <CartPage/>},
    {path: ROUTES.SHIPPING, element: <ShippingPage/>},
    {path: ROUTES.CHECKOUT, element: <CheckOutPage/>},
    {path: ROUTES.ORDER, element: <OrderCompletePage/>},
    {path: ROUTES.PROFILE, element: <ProfilePage/>},
];

const routeFallback = (
    <div
        className="min-h-[40vh] w-full flex items-center justify-center text-app-gray"
        role="status"
        aria-live="polite"
    >
        Cargando...
    </div>
);

const AppRoutes: FC = () => {
    return (
        <Suspense fallback={routeFallback}>
            <Routes>
                {publicRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}

                {protectedRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<RequireAuth>{route.element}</RequireAuth>}
                    />
                ))}

                <Route path="*" element={<Navigate to={ROUTES.ERROR_PAGE} replace/>}/>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
