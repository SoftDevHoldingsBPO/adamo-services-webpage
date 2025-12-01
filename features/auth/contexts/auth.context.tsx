"use client";

import { User } from "@/features/auth/entities/user.entity";
import AuthService from "@/features/auth/services/auth.service";
import { ProfileService } from "@/features/profile/services/profile.service";
import { useQuery } from "@tanstack/react-query";

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
  fetchUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("unauthenticated"); // Default to unauthenticated - ProtectedRoute will verify if needed

  const { data: user, refetch: getUserProfile } = useQuery({
    queryKey: [ProfileService.GET_PROFILE_QUERY_KEY],
    queryFn: ProfileService.get,
    enabled: status === "authenticated",
    staleTime: Infinity,
  });

  const fetchUserProfile = async () => {
    setStatus("loading"); // Set loading when actually checking auth

    const result = await getUserProfile();

    if (result.error) {
      setStatus("unauthenticated");
      return;
    }

    setStatus("authenticated");
  };

  const signOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        status,
        fetchUserProfile,
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
