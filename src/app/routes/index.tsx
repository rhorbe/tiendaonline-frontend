import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { IRoute } from "@/core/interface/common";
import { ROUTES } from "@/core/enum/common";

import {
  CartPage,
  CheckOutPage,
  ContactPage,
  ErrorPage,
  ForgotPassword,
  HomePage,
  LoginPage,
  OtpPage,
  ProductPage,
  RegisterPage,
  ShopPage,
} from "@/app/pages";
import OrderComplete from "../pages/order";
import ProfilePage from "../pages/profile";

const AppRoutes: FC = () => {
  const routes: IRoute[] = [
    {
      name: "Login",
      path: ROUTES.LOGIN,
      component: LoginPage,
    },
    {
      name: "Register",
      path: ROUTES.REGISTER,
      component: RegisterPage,
    },
    {
      name: "Shop",
      path: ROUTES.SHOP,
      component: ShopPage,
    },
    {
      name: "Product",
      path: ROUTES.PRODUCT,
      component: ProductPage,
    },
    {
      name: "Cart",
      path: ROUTES.CART,
      component: CartPage,
    },
    {
      name: "Checkout",
      path: ROUTES.CHECKOUT,
      component: CheckOutPage,
    },
    {
      name: "Order",
      path: ROUTES.ORDER,
      component: OrderComplete,
    },
    {
      name: "Profile",
      path: ROUTES.PROFILE,
      component: ProfilePage,
    },
    {
      name: "Contact",
      path: ROUTES.CONTACT,
      component: ContactPage,
    },
    {
      name: "Forgot Password",
      path: ROUTES.FORGOT_PASSWORD,
      component: ForgotPassword,
    },
    {
      name: "Otp",
      path: ROUTES.OTP_PAGE,
      component: OtpPage,
    },
    {
      name: "Error",
      path: ROUTES.ERROR_PAGE,
      component: ErrorPage,
    },
  ];

  return (
    <Routes>
      {/* <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.HOME} replace />} /> */}

      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
