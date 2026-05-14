// AuthContext.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { User } from "@/core/models/User";
import { AuthContext } from "./auth-context";
import { setUnauthorizedHandler } from "@/core/api/interceptors";
import { isTokenExpired } from "@/core/utils/jwt";

type StoredUser = Partial<User> & { _id?: string };

const normalizeStoredUser = (value: unknown): User | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as StoredUser;
  const normalizedId = candidate.id ?? candidate._id;

  if (!normalizedId || !candidate.name || !candidate.email) {
    return null;
  }

  return {
    id: normalizedId,
    name: candidate.name,
    email: candidate.email,
    email_verified_at: candidate.email_verified_at ?? null,
    cliente_id: candidate.cliente_id,
    active: candidate.active,
    remember_token: candidate.remember_token,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearSession = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!stored || !token) {
      if (stored || token) {
        clearSession();
      }
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const normalizedUser = normalizeStoredUser(parsed);

      if (!normalizedUser || isTokenExpired(token, 30)) {
        clearSession();
        return;
      }

      setUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } catch {
      clearSession();
    }
  }, [clearSession]);

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const updatedUser = {
        ...currentUser,
        ...userData,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      const { desuscribirseDePush } = await import("@/app/push");
      await desuscribirseDePush();
    } catch (error) {
      // El cierre de sesión no debe bloquearse por un fallo de push.
      console.warn("No se pudo desuscribir push al cerrar sesión", error);
    }

    clearSession();
  }, [clearSession]);

  useEffect(() => {
    setUnauthorizedHandler(clearSession);

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [clearSession]);

  const authContextValue = useMemo(
    () => ({ user, login, updateUser, logout }),
    [user, login, updateUser, logout],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

