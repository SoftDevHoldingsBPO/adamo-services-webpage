import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with requests
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
 * Response interceptor - Handle token refresh on 401 errors
 * Tokens are managed via HTTP-only cookies, refresh is automatic
 */
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     // Handle 401 Unauthorized - attempt token refresh only if access token was present
//     if (
//       error.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // Attempt to refresh the token using the refresh token cookie
//         // The server will automatically read the adamo_refresh_token cookie
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`,
//           {},
//           {
//             withCredentials: true, // Send cookies with the request
//           },
//         );

//         // Retry the original request - new token is now in the cookie
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed, redirect to home with session expired fla
//         // Avoid infinite loop - only redirect if not already on session_expired page
//         if (!window.location.search.includes("session_expired=true")) {
//           window.location.href = "/?session_expired=true";
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
