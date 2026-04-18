import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { ROUTES } from "@/core/enum/common";
import { useAuth } from "@/store/useAuth";

interface RequireAuthProps {
  children: ReactElement;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

