import type { APIRoute } from "astro";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DateTime } from "luxon";

import { auth } from "../../../util/auth";
import prismaClient from "../../../util/prisma-client";
import { SPOTIFY_CLIENT_ID } from "astro:env/server";

const LIMIT = 50;

export const GET: APIRoute = async ({ request }) => {
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

  const spotifyClient = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, {
    access_token: spotifyAccount.accessToken as string,
    refresh_token: spotifyAccount.refreshToken as string,
    token_type: "Bearer",
    expires_in: DateTime.fromJSDate(
      spotifyAccount.accessTokenExpiresAt as Date,
    ).diff(DateTime.now(), "seconds").seconds,
  });

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const offset = parseInt(params.get("offset") || "0");

  const data = await spotifyClient.currentUser.tracks.savedTracks(
    LIMIT,
    offset,
  );

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
