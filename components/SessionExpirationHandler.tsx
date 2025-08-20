"use client";

import { useEffect, useRef } from "react";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SessionExpirationHandler() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only check for expiration if we're not loading and haven't already redirected
    if (status === "loading" || hasRedirected.current) {
      return;
    }

    // Check if session has TokenExpiredError
    if (session?.error === "TokenExpiredError") {
      hasRedirected.current = true;
      signOut({ callbackUrl: "/" }); // Sign out and redirect to home
      return;
    }

    // If session is null and we were previously authenticated, it means the session expired
    if (status === "unauthenticated" && !hasRedirected.current) {
      // Check if we're not already on the home page
      if (window.location.pathname !== "/") {
        hasRedirected.current = true;
        console.log("Session unauthenticated, redirecting to home...");
        router.push("/");
      }
    }
  }, [session, status, router]);

  // This component doesn't render anything
  return null;
}
