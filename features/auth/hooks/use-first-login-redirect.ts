import { SESSION_STORAGE_KEYS } from "@/features/auth/constants/session-storage-keys";

/**
 * Hook to manage first login redirect logic
 */
export function useFirstLoginRedirect() {
  /**
   * Marks the current session as a first login
   */
  const markAsFirstLogin = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.FIRST_LOGIN, "true");
  };

  /**
   * Checks if this is a first login and clears the flag
   * @returns true if this is a first login
   */
  const checkAndClearFirstLogin = (): boolean => {
    const isFirstLogin =
      sessionStorage.getItem(SESSION_STORAGE_KEYS.FIRST_LOGIN) === "true";

    if (isFirstLogin) {
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.FIRST_LOGIN);
    }

    return isFirstLogin;
  };

  return {
    markAsFirstLogin,
    checkAndClearFirstLogin,
  };
}
