"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";
import { FullPageLoader } from "@/components/ui/full-page-loader";

import { ReactNode, useEffect } from "react";

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

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = redirectTo;
    }
  }, [status, redirectTo]);

  if (status === "loading") {
    return <FullPageLoader />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
