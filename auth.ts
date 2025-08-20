import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Called when credentials are submitted. See SignInDialog when submitting SignInForm
      async authorize(credentials) {
        // Mock user data - replace with actual API response
        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          role: "admin",
          accessToken: "123456",
          accessTokenExpires: Date.now() + 30000,
        };

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            accessToken: user.accessToken,
            accessTokenExpires: user.accessTokenExpires,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in: Store access token and expiration
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // Check if token is expired
      if (token.accessTokenExpires && Date.now() >= token.accessTokenExpires) {
        return { ...token, error: "TokenExpiredError" };
      }

      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

/**
 * Auth.js Types
 *
 * 1. USER:
 *    - Temporary data returned during the authentication process (authorize function)
 *    - Only available during login/signup flow
 *    - Contains the initial user data from your authentication provider/API
 *    - Gets passed to the JWT callback to populate the token
 *
 * 2. JWT (Token):
 *    - Persistent data stored in a JSON Web Token
 *    - Survives across requests and browser sessions
 *    - Acts as the "source of truth" for user data during the session
 *    - Gets updated in the jwt callback and passed to the session callback
 *
 * 3. SESSION:
 *    - Data available to your application components
 *    - Derived from the JWT token in the session callback
 *    - What you actually consume in your React components via useSession()
 *    - Should contain only the data your frontend needs
 *
 * Flow: User (login) → JWT (storage) → Session (consumption)
 */
