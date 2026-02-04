import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  TIDAL_CLIENT_ID,
  TIDAL_CLIENT_SECRET,
  BETTER_AUTH_URL,
} from "astro:env/server";
import { betterAuth } from "better-auth/minimal";
import prismaClient from "./prisma-client";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";

const TIDAL_API_USER_URL = "https://openapi.tidal.com/v2/users/me";

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, { provider: "mysql" }),
  account: { accountLinking: { enabled: true, allowDifferentEmails: true } },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "tidal",
          clientId: TIDAL_CLIENT_ID,
          clientSecret: TIDAL_CLIENT_SECRET,
          authorizationUrl: "https://login.tidal.com/authorize",
          tokenUrl: "https://auth.tidal.com/v1/oauth2/token",
          redirectURI: `${BETTER_AUTH_URL}/api/auth/oauth2/callback/tidal`,
          pkce: true,
          scopes: ["user.read"],
          getUserInfo: async (tokens) =>
            fetch(TIDAL_API_USER_URL, {
              headers: new Headers({
                Authorization: `${tokens.tokenType} ${tokens.accessToken}`,
              }),
            })
              .then((res) => res.json())
              .then((payload) => payload.data?.attributes),
          mapProfileToUser: (profile) => ({
            email: profile.email,
            name: profile.username,
            emailVerified: profile.emailVerified,
          }),
        },
      ],
    }),
  ],
  socialProviders: {
    spotify: {
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      scope: ["user-library-read"],
    },
  },
});
