/**
 * Query parameter constants for authentication and navigation
 */
export const AUTH_QUERY_PARAMS = {
  SESSION_EXPIRED: "session_expired",
  REDIRECT_TO: "redirect_to",
  LOGIN_OPEN: "login_open",
} as const;

export const AUTH_QUERY_VALUES = {
  TRUE: "true",
} as const;
