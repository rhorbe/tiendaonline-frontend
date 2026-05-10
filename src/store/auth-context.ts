import { createContext } from "react";
import { User } from "@/core/models/User";

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

