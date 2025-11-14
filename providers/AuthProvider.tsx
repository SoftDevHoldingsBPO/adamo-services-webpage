"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/types/user";
import AuthService from "@/services/auth";

interface AuthContextType {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
  isSessionExpired: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        
        // Check if token is expired
        if (parsedUser.accessTokenExpires && Date.now() >= parsedUser.accessTokenExpires) {
          // Token expired, clear storage
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setUser(null);
          setStatus("unauthenticated");
          setIsSessionExpired(true);
        } else {
          setUser(parsedUser);
          setStatus("authenticated");
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setStatus("unauthenticated");
      }
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  // Check for token expiration periodically
  useEffect(() => {
    if (!user || !user.accessTokenExpires) return;

    const checkExpiration = () => {
      if (user.accessTokenExpires && Date.now() >= user.accessTokenExpires) {
        // Token expired
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
        setStatus("unauthenticated");
        setIsSessionExpired(true);
      }
    };

    const interval = setInterval(checkExpiration, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [user]);

  const signIn = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    // Call the AuthService to handle authentication
    const response = await AuthService.signIn({ email, password });

    if (response.ok && response.user) {
      // Store user in state and localStorage
      setUser(response.user);
      setStatus("authenticated");
      setIsSessionExpired(false);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.user));

      return { ok: true };
    }

    return { ok: false, error: response.error };
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setStatus("unauthenticated");
    setIsSessionExpired(false);
  };

  return (
    <AuthContext.Provider value={{ user, status, signIn, signOut, isSessionExpired }}>
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
