"use client";

import { clearValidSession, markValidSession } from "@/api/auth-request-config";
import { User } from "@/features/auth/entities/user.entity";
import AuthService from "@/features/auth/services/auth.service";
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";
import { SessionIndicator } from "@/features/auth/utils/session-indicator.utils";
import { ProfileService } from "@/features/profile/services/profile.service";
import { type Locale, defaultLocale, locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

function getLocaleCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;

  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);

  const value = match?.[1];

  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

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

  const router = useRouter();

  // Set authenticated state and user
  const setAuthenticated = (user: User) => {
    SessionIndicator.mark();

    markValidSession();

    setUser(user);
    setStatus("authenticated");

    if (user.lang) {
      const lang: Locale = locales.includes(user.lang as Locale)
        ? (user.lang as Locale)
        : defaultLocale;

      if (lang !== getLocaleCookie()) {
        setUserLocale(lang).then(() => router.refresh());
      }
    }
  };

  // Set unauthenticated state
  const setUnauthenticated = () => {
    SessionIndicator.clear();
    clearValidSession();
    setUser(null);
    setStatus("unauthenticated");
  };

  // Fetch user profile and, if primary_user, also fetch org users
  const fetchProfileWithOrgUsers = async (options?: {
    isInitialAuthCheck?: boolean;
  }): Promise<User> => {
    const user = await ProfileService.get(options);

    if (user.role === "primary_user") {
      const orgUsers = await ProfileService.getOrgUsers(user.email);
      return { ...user, orgUsers };
    }

    return user;
  };

  // Fetch user profile and set state
  const fetchAndSetUser = async (): Promise<boolean> => {
    setStatus("loading");

    try {
      const user = await fetchProfileWithOrgUsers();

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

      // Skip API calls for visitors who have never signed in on this browser
      if (!SessionIndicator.has()) {
        setUnauthenticated();
        return;
      }

      try {
        const user = await fetchProfileWithOrgUsers({
          isInitialAuthCheck: true,
        });
        setAuthenticated(user);
      } catch {
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
