import type { APIRoute } from "astro";
import SpotifyWebApi from "spotify-web-api-node";

import { auth } from "../../../util/auth";
import prismaClient from "../../../util/prisma-client";

const LIMIT = 50;

export const GET: APIRoute = async ({ request }) => {
  // 1. Validate Better Auth session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const spotifyAccount = await prismaClient.account.findFirst({
    where: { providerId: "spotify", userId: session.user.id },
  });
  if (!spotifyAccount) {
    return new Response("Spotify not connected", { status: 403 });
  }

  const spotifyClient = new SpotifyWebApi({
    accessToken: spotifyAccount.accessToken as string,
    refreshToken: spotifyAccount.refreshToken as string,
  });

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const offset = parseInt(params.get("offset") || "0");

  const data = await spotifyClient.getMySavedTracks({ limit: LIMIT, offset });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
