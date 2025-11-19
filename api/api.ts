import { AUTH_STORAGE_KEY } from "@/features/auth/contexts/auth.context";
import { RefreshTokenResponse } from "@/features/auth/dtos/refresh-token.dto";
import { Auth } from "@/features/auth/entities/auth.entity";
import { User } from "@/features/auth/entities/user.entity";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * Axios instance configured with base URL from environment variables
 *
 * Environment variable required:
 * - NEXT_PUBLIC_API_BASE_URL: The base URL for API requests
 *
 * Example .env.local:
 * NEXT_PUBLIC_API_BASE_URL=https://api.example.com
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
 * Flag to prevent infinite refresh loops
 */
let isRefreshing = false;

/**
 * Request interceptor - Add authentication token and locale if available
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if available
    const rawAuthentication = localStorage.getItem(AUTH_STORAGE_KEY);

    if (rawAuthentication) {
      try {
        const authentication = JSON.parse(rawAuthentication);

        if (authentication.auth.accessToken) {
          config.headers.Authorization = `Bearer ${authentication.auth.accessToken}`;
        }
      } catch (error) {
        console.error("Failed to parse authentication:", error);
      }
    }

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
 * Response interceptor - Handle common error cases
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - differentiate between expired token and wrong credentials
    if (error.response?.status === 401 && originalRequest) {
      const rawAuthentication = localStorage.getItem(AUTH_STORAGE_KEY);

      // Only attempt refresh if there was an access token (expired/invalid token scenario)
      // If no token exists, it's likely a failed login attempt with wrong credentials
      if (rawAuthentication && !originalRequest._retry && !isRefreshing) {
        try {
          const authentication = JSON.parse(rawAuthentication) as {
            auth: Auth;
            user: User;
          };

          // Check if access token and refresh token exist
          if (authentication.auth?.accessToken && authentication.auth?.refreshToken) {
            // Mark as retrying to prevent infinite loops
            originalRequest._retry = true;
            isRefreshing = true;

            try {
              // Attempt to refresh the token
              // Use the expired access token in the Authorization header
              const response = await axios.post<RefreshTokenResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`,
                { refreshToken: authentication.auth.refreshToken },
                {
                  headers: {
                    Authorization: `Bearer ${authentication.auth.accessToken}`,
                    "Content-Type": "application/json",
                  },
                },
              );

              // Update the access token in storage
              const newAuth: Auth = {
                ...authentication.auth,
                accessToken: response.data.data.token,
                accessTokenExpiredAt: response.data.data.expiredAt,
              };

              localStorage.setItem(
                AUTH_STORAGE_KEY,
                JSON.stringify({ auth: newAuth, user: authentication.user }),
              );

              // Update the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${newAuth.accessToken}`;

              isRefreshing = false;

              // Retry the original request with the new token
              return api(originalRequest);
            } catch (refreshError) {
              // Refresh failed, clear storage and redirect
              isRefreshing = false;
              localStorage.removeItem(AUTH_STORAGE_KEY);
              window.location.href = "/?session_expired=true";

              return Promise.reject(refreshError);
            }
          } else {
            // No refresh token available, clear and redirect
            localStorage.removeItem(AUTH_STORAGE_KEY);
            window.location.href = "/";
          }
        } catch (parseError) {
          // If parsing fails, clear corrupted data
          localStorage.removeItem(AUTH_STORAGE_KEY);
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  },
);
