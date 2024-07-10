import NextAuth, { NextAuthConfig, Session } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: [
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/spreadsheets",
          ].join(" "),
          response: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000, // 3600 seconds
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {
        console.log("Access token expired getting new one");
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID as string, // Type assertion
              client_secret: process.env.AUTH_GOOGLE_SECRET as string, // Type assertion
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string, // Type assertion
            }),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }; // updated inside our session-token cookie
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        // UNSECURE!!!
        // https://github.com/nextauthjs/next-auth/pull/9702
        // Access and refresh token should be stored in database instead of
        // being available client-side. Must fix.
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
  },
});

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}
