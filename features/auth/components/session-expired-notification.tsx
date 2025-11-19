"use client";

import { ToastManager } from "@adamosuiteservices/ui/toaster";

import { useEffect } from "react";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

/**
 * Client component that detects session expiration from query parameters
 * and shows a toast notification to the user.
 *
 * When refresh token expires, the API redirects to /?session_expired=true
 * This component detects that and shows an appropriate message.
 */
export function SessionExpiredNotification() {
  const searchParams = useSearchParams();
  const t = useTranslations("common");

  useEffect(() => {
    // Check if user was redirected due to session expiration
    if (searchParams.get("session_expired") === "true") {
      setTimeout(() => {
        ToastManager.show({
          variant: "warning",
          message: t("session-expired"),
        });

        // Clean up URL by removing the query parameter
        window.history.replaceState({}, "", "/");
      }, 0);
    }
  }, [searchParams, t]);

  // This component doesn't render anything
  return null;
}
