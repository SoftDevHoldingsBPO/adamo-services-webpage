import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";

export function useSignInDialog() {
  const searchParams = useSearchParams();

  const loginOpen = AuthQueryUtils.shouldOpenLogin(searchParams);

  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(loginOpen);

  return {
    isSignInDialogOpen,
    setIsSignInDialogOpen,
  };
}
