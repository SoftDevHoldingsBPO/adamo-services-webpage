"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";

import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { FullPageLoader } from "@/components/ui/full-page-loader";

export type ProtectedRouteProps = Readonly<{
  children: ReactNode;
  redirectTo?: string;
}>;

/**
 * ProtectedRoute component - Wraps content that requires authentication
 * Shows a full-page loader while checking authentication status.
 * Redirects to home (or specified path) if user is not authenticated.
 *
 * Usage:
 * ```tsx
 * "use client";
 *
 * export default function PrivatePage() {
 *   return (
 *     <ProtectedRoute>
 *       <YourPrivateContent />
 *     </ProtectedRoute>
 *   );
 * }
 * ```
 */
export function ProtectedRoute({
  children,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { status } = useAuth();

  if (status === "loading") {
    return <FullPageLoader />;
  }

  if (status === "unauthenticated") {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
