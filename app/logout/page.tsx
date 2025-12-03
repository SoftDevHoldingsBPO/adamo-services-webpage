"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

import { FullPageLoader } from "@/components/ui/full-page-loader";

export default function LogoutPage() {
  const t = useTranslations("common");

  const { signOut } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setIsLoggingOut(false);

        redirect("/");
      }
    };

    performLogout();
  }, []);

  return (
    <FullPageLoader
      message={isLoggingOut ? t("logging-out") : t("redirecting")}
    />
  );
}
