"use client";

import { useAuth } from "@/providers/AuthProvider";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

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
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);

  // Show full-page loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-neutral-200 border-t-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
