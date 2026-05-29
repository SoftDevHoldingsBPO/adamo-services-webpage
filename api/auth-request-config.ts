import { InternalAxiosRequestConfig } from "axios";

export type AuthRequestConfig = InternalAxiosRequestConfig & {
  /** Initial auth check on app load — do not refresh tokens or show session expired */
  _isInitialAuthCheck?: boolean;
  _retry?: boolean;
};

let hadValidSessionThisPage = false;

export function markValidSession(): void {
  hadValidSessionThisPage = true;
}

export function clearValidSession(): void {
  hadValidSessionThisPage = false;
}

export function hadValidSession(): boolean {
  return hadValidSessionThisPage;
}
