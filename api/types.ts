/**
 * Standard API error response structure
 */
export type APIErrorResponse = {
  message: string;
  data: unknown;
  errors: string[];
  timestamp: string;
};

export type APISuccessResponse<T> = {
  message: string;
  data: T;
  timestamp: string;
};
