"use client";

import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";
import { ToastManager } from "@adamosuiteservices/ui/toaster";

import { useEffect } from "react";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

/**
 * Client component that detects session expiration from query parameters
 * and shows a toast notification to the user.
 *
 * When refresh token expires, the API redirects with session_expired parameter
 * This component detects that and shows an appropriate message.
 */
export function SessionExpiredNotification() {
  const searchParams = useSearchParams();
  const t = useTranslations("common");

  useEffect(() => {
    // Check if user was redirected due to session expiration
    if (AuthQueryUtils.isSessionExpired(searchParams)) {
      setTimeout(() => {
        ToastManager.show({
          variant: "warning",
          message: t("session-expired"),
        });

        // Clean up URL by removing only the session_expired parameter
        const params = new URLSearchParams(searchParams.toString());

        params.delete("session_expired");

        const newUrl = params.toString() ? `/?${params.toString()}` : "/";

        window.history.replaceState({}, "", newUrl);
      }, 0);
    }
  }, [searchParams]);

  // This component doesn't render anything
  return null;
}
