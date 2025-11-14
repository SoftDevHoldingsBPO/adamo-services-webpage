"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
