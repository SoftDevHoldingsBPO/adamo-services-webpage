"use client";

import { User } from "@/features/auth/entities/user.entity";
import AuthService from "@/features/auth/services/auth.service";
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";
import { ProfileService } from "@/features/profile/services/profile.service";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Internal handler for imperatively updating auth state from outside React
 * (e.g., from axios interceptors)
 */
let authHandlers: {
  setUnauthenticated: () => void;
} | null = null;

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  status: "loading" | "authenticated" | "unauthenticated";
  setAuthenticated: (user: User) => void;
  setUnauthenticated: () => void;
  fetchAndSetUser: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading"); // Start with loading to check auth on mount

  const [user, setUser] = useState<User | null>(null);

  // Set authenticated state and user
  const setAuthenticated = (user: User) => {
    setUser(user);
    setStatus("authenticated");
  };

  // Set unauthenticated state
  const setUnauthenticated = () => {
    setUser(null);
    setStatus("unauthenticated");
  };

  // Fetch user profile and set state
  const fetchAndSetUser = async (): Promise<boolean> => {
    setStatus("loading");

    try {
      const user = await ProfileService.get();

      setAuthenticated(user);

      return true;
    } catch {
      setUnauthenticated();

      return false;
    }
  };

  const signOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      // Silently handle logout errors
    } finally {
      setUnauthenticated();
    }
  };

  // Register auth state handler for external updates
  // This allows the axios interceptor to update auth state
  authHandlers = {
    setUnauthenticated,
  };

  // Cleanup handler when component unmounts
  useEffect(() => {
    return () => {
      authHandlers = null;
    };
  }, []);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check if session expired (to avoid infinite loop)
      if (AuthQueryUtils.hasSessionExpired(window.location.search)) {
        setUnauthenticated();
        return;
      }

      try {
        // Try to get user profile (will use cookies automatically)
        const user = await ProfileService.get();
        setAuthenticated(user);
      } catch {
        // If it fails, user is not authenticated
        setUnauthenticated();
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        status,
        setAuthenticated,
        setUnauthenticated,
        fetchAndSetUser,
        signOut,
      }}
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

/**
 * Notify the auth system that authentication has failed.
 * This can be called from outside React (e.g., axios interceptors)
 * to update the auth state, which will trigger re-renders in ProtectedRoute
 * and redirect users away from protected pages.
 */
export function notifyUnauthenticated(): void {
  if (authHandlers) {
    authHandlers.setUnauthenticated();
  }
}
