import {
  AuthRequestConfig,
  clearValidSession,
  hadValidSession,
  markValidSession,
} from "@/api/auth-request-config";
import { notifyUnauthenticated } from "@/features/auth/contexts/auth.context";
import axios, { AxiosError } from "axios";

import { APIErrorResponse } from "./types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Queue to store pending requests during token refresh
let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * Process all queued requests after token refresh
 */
const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

/**
 * Helper function to get locale from cookie on client side
 */
function getLocaleFromCookie(): string {
  const cookies = document.cookie.split("; ");

  const localeCookie = cookies.find((cookie) =>
    cookie.startsWith("NEXT_LOCALE="),
  );

  return localeCookie ? localeCookie.split("=")[1] : "es";
}

/**
 * Request interceptor - Add locale header
 * Auth tokens are automatically sent via HTTP-only cookies
 */
api.interceptors.request.use(
  (config) => {
    // Add Accept-Language header from locale cookie
    const locale = getLocaleFromCookie();

    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor - Handle token refresh
 * Tokens are managed via HTTP-only cookies, refresh is automatic
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<APIErrorResponse>) => {
    const originalRequest = error.config as AuthRequestConfig;

    // Check if the error is ACCESS_TOKEN_EXPIRED error
    const is401Error = error.response?.status === 401;
    const isAccessTokenExpired = error.response?.data?.errors?.includes(
      "ACCESS_TOKEN_EXPIRED",
    );

    // Handle 401 errors that are NOT token expiration (invalid credentials, etc.)
    if (is401Error && !isAccessTokenExpired && !originalRequest._retry) {
      // Mark as retried to prevent multiple redirects
      originalRequest._retry = true;

      // Reject all queued requests
      processQueue(error);
      isRefreshing = false;

      // Notify auth context to update state
      // This will cause ProtectedRoute to re-render and redirect if on a protected page
      notifyUnauthenticated();

      return Promise.reject(error);
    }

    // Handle ACCESS_TOKEN_EXPIRED - attempt token refresh
    if (is401Error && isAccessTokenExpired && !originalRequest._retry) {
      // Initial auth probe: no cookies or stale session — fail quietly
      if (originalRequest._isInitialAuthCheck) {
        notifyUnauthenticated();
        return Promise.reject(error);
      }

      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token using the refresh token cookie
        // The server will automatically read the adamo_refresh_token cookie
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`,
          {},
          {
            withCredentials: true, // Send cookies with the request
          },
        );

        markValidSession();

        // Process all queued requests
        processQueue();
        isRefreshing = false;

        // Retry the original request - new token is now in the cookie
        return api(originalRequest);
      } catch (refreshError) {
        // Process queue with error
        processQueue(refreshError);
        isRefreshing = false;

        // Only treat as "session expired" when the user had an active session
        // during this page visit (not for anonymous visitors or initial auth checks).
        const shouldNotifySessionExpired =
          hadValidSession() &&
          !window.location.search.includes("session_expired=true");

        clearValidSession();

        if (shouldNotifySessionExpired) {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`,
              {},
              { withCredentials: true },
            );
          } catch {
            // Ignore logout errors — session is already invalid
          }
          window.location.href = "/?session_expired=true";
        } else {
          notifyUnauthenticated();
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
