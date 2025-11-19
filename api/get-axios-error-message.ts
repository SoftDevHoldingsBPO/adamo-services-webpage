import { AxiosError } from "axios";
import { APIErrorResponse } from "./types";

/**
 * Extract error messages from an Axios error
 *
 * @param error - The error object (typically from a catch block)
 * @returns An object with the main message and array of error messages
 *
 * @example
 * ```ts
 * try {
 *   await api.post('/auth/signup', data);
 * } catch (error) {
 *   const { message, errors } = getAxiosErrorMessages(error);
 *   console.log(message); // "errors.auth.email_exists"
 *   console.log(errors);  // ["errors.auth.email_exists"]
 * }
 * ```
 */
export function getAxiosErrorMessages(error: unknown): {
  message: string;
  errors: string[];
} {
  // Check if it's an Axios error with a response
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as Partial<APIErrorResponse>;

    return {
      message: data.message || "An error occurred",
      errors: data.errors || [],
    };
  }

  // Fallback for non-Axios errors
  if (error instanceof Error) {
    return {
      message: error.message,
      errors: [error.message],
    };
  }

  // Unknown error type
  return {
    message: "An unexpected error occurred",
    errors: [],
  };
}

/**
 * Get the first error message from an Axios error
 *
 * @param error - The error object
 * @returns The first error message or a fallback message
 *
 * @example
 * ```ts
 * try {
 *   await api.post('/auth/signup', data);
 * } catch (error) {
 *   const errorMsg = getFirstAxiosError(error);
 *   toast.error(errorMsg); // "errors.auth.email_exists"
 * }
 * ```
 */
export function getFirstAxiosErrorMessage(error: unknown): string {
  const { message, errors } = getAxiosErrorMessages(error);
  return errors.length > 0 ? errors[0] : message;
}
