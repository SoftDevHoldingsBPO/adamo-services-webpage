import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** Initial auth check on app load — do not refresh tokens or show session expired */
    _isInitialAuthCheck?: boolean;
    _retry?: boolean;
  }
}
