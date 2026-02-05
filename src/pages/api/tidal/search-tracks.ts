import type { APIRoute } from "astro";
import { createAPIClient } from "@tidal-music/api";

export const GET: APIRoute = async ({ request }) => {
  const tidalClient = createAPIClient()

  return new Response(JSON.stringify({ tracks: [] }), {
    headers: { "Content-Type": "application/json" },
  });
};
