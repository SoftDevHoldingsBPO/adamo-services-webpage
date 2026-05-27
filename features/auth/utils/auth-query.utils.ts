import {
  AUTH_QUERY_PARAMS,
  AUTH_QUERY_VALUES,
} from "@/features/auth/constants/auth-query-params";

/**
 * Utility class for handling authentication-related query parameters and URLs
 */
export class AuthQueryUtils {
  /**
   * Build session expired URL
   * @returns URL string with session_expired parameter
   */
  public static getSessionExpiredUrl(): string {
    return `/?${AUTH_QUERY_PARAMS.SESSION_EXPIRED}=${AUTH_QUERY_VALUES.TRUE}`;
  }

  /**
   * Check if current URL has session expired parameter
   * @param search - The search string from window.location.search
   * @returns true if session_expired=true is present in the URL
   */
  public static hasSessionExpired(search: string): boolean {
    return search.includes(
      `${AUTH_QUERY_PARAMS.SESSION_EXPIRED}=${AUTH_QUERY_VALUES.TRUE}`,
    );
  }

  /**
   * Check if search params indicate session expired
   * @param searchParams - URLSearchParams object
   * @returns true if session_expired parameter is set to true
   */
  public static isSessionExpired(searchParams: URLSearchParams): boolean {
    return (
      searchParams.get(AUTH_QUERY_PARAMS.SESSION_EXPIRED) ===
      AUTH_QUERY_VALUES.TRUE
    );
  }

  /**
   * Build login URL with optional redirect
   * @param redirectTo - Optional URL to redirect after login
   * @returns URL string with login_open parameter and optional redirect_to
   */
  public static getLoginUrl(redirectTo?: string): string {
    const params = new URLSearchParams();

    params.set(AUTH_QUERY_PARAMS.LOGIN_OPEN, AUTH_QUERY_VALUES.TRUE);

    if (redirectTo) {
      params.set(AUTH_QUERY_PARAMS.REDIRECT_TO, redirectTo);
    }

    return `/?${params.toString()}`;
  }

  /**
   * Check if login dialog should be opened based on URL parameters
   * @param searchParams - URLSearchParams object
   * @returns true if login_open parameter is set to true
   */
  public static shouldOpenLogin(searchParams: URLSearchParams): boolean {
    return (
      searchParams.get(AUTH_QUERY_PARAMS.LOGIN_OPEN) === AUTH_QUERY_VALUES.TRUE
    );
  }

  /**
   * Get redirect URL from search params
   * @param searchParams - URLSearchParams object
   * @returns redirect URL if present, null otherwise
   */
  public static getRedirectUrl(searchParams: URLSearchParams): string | null {
    return searchParams.get(AUTH_QUERY_PARAMS.REDIRECT_TO);
  }

  /**
   * Whether the request is part of an SSO flow and should not be redirected away.
   */
  public static isSsoFlow(
    searchParams: URLSearchParams,
    pathname: string,
  ): boolean {
    if (pathname === "/logout") {
      return true;
    }

    if (this.shouldOpenLogin(searchParams)) {
      return true;
    }

    if (searchParams.has(AUTH_QUERY_PARAMS.REDIRECT_TO)) {
      return true;
    }

    return false;
  }

  /**
   * Clean authentication-related query parameters from URL
   * Removes session_expired, login_open, and redirect_to parameters
   */
  public static cleanAuthParams(): void {
    const url = new URL(window.location.href);

    url.searchParams.delete(AUTH_QUERY_PARAMS.SESSION_EXPIRED);
    url.searchParams.delete(AUTH_QUERY_PARAMS.LOGIN_OPEN);
    url.searchParams.delete(AUTH_QUERY_PARAMS.REDIRECT_TO);

    window.history.replaceState({}, "", url.pathname + url.search);
  }
}
