import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * Auth.js Types Documentation
 *
 * USER:
 * - Temporary data returned during authentication (authorize function)
 * - Only available during login/signup flow
 * - Contains initial user data from your authentication provider/API
 * - Gets passed to the JWT callback to populate the token
 *
 * JWT (Token):
 * - Persistent data stored in a JSON Web Token
 * - Survives across requests and browser sessions
 * - Acts as the "source of truth" for user data during the session
 * - Gets updated in the jwt callback and passed to the session callback
 *
 * SESSION:
 * - Data available to your application components
 * - Derived from the JWT token in the session callback
 * - What you consume in React components via useSession()
 * - Should contain only the data your frontend needs
 *
 * Flow: User (login) → JWT (storage) → Session (consumption)
 */

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    accessTokenExpires?: number;
    role?: string;
  }

  interface Session extends DefaultSession {
    error?: string;
    user: {
      id: string;
      role?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    role?: string;
    error?: string;
  }
}
