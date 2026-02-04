import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  TIDAL_CLIENT_ID,
  TIDAL_CLIENT_SECRET,
} from "astro:env/server";
import { betterAuth } from "better-auth/minimal";
import prismaClient from "./prisma-client";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";

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
