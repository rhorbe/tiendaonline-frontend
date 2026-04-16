// AuthContext.tsx
import { useState, useEffect } from "react";
import { desuscribirseDePush } from "@/app/push";
import { AuthContext } from "@/store/authContext";
import { User } from "@/core/models/User";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) return;

    try {
      setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await desuscribirseDePush();
    } catch (error) {
      // El cierre de sesión no debe bloquearse por un fallo de push.
      console.warn("No se pudo desuscribir push al cerrar sesión", error);
    }

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

