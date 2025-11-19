"use client";

import { Auth } from "@/features/auth/entities/auth.entity";
import { User } from "@/features/auth/entities/user.entity";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setAuth: (auth: Auth, user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AUTH_STORAGE_KEY = "auth_data";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  // Load user from localStorage on mount (auth tokens stay in localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth) as {
          auth: Auth;
          user: User;
        };

        // Only restore user to React state, auth tokens stay in localStorage
        setUser(parsed.user);
        setStatus("authenticated");
      } catch (error) {
        console.error("Failed to parse stored auth data:", error);

        localStorage.removeItem(AUTH_STORAGE_KEY);

        setStatus("unauthenticated");
      }
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const setAuth = (auth: Auth, user: User) => {
    // Store both auth and user to localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ auth, user }));

    // Only update React state with user data
    setUser(user);
    setStatus("authenticated");
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);

    setUser(null);
    setStatus("unauthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ user, status, setAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
