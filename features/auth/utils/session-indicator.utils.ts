import { LOCAL_STORAGE_KEYS } from "@/features/auth/constants/local-storage-keys";

/**
 * Non-sensitive client hint that the user has signed in on this browser.
 * Auth tokens remain in HTTP-only cookies; this only avoids unnecessary
 * profile/refresh calls for visitors who have never authenticated.
 */
export class SessionIndicator {
  public static mark(): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_SESSION, "1");
  }

  public static clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_SESSION);
  }

  public static has(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_SESSION) === "1";
  }
}
