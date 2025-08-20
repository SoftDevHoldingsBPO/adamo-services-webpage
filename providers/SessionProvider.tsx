"use client";

import { ReactNode } from "react";

import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

type SessionProviderProps = {
  children: ReactNode;
  session?: Session | null;
};

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
