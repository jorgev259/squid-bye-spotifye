// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SPOTIFY_CLIENT_ID: {
        access: "secret",
        context: "server",
        type: "string",
      },
      SPOTIFY_CLIENT_SECRET: {
        access: "secret",
        context: "server",
        type: "string",
      },
      TIDAL_CLIENT_ID: {
        access: "secret",
        context: "server",
        type: "string",
      },
      TIDAL_CLIENT_SECRET: {
        access: "secret",
        context: "server",
        type: "string",
      },
      DB_HOST: {
        access: "secret",
        context: "server",
        type: "string",
      },
      DB_USER: {
        access: "secret",
        context: "server",
        type: "string",
      },
      DB_PWD: {
        access: "secret",
        context: "server",
        type: "string",
      },
      DB_NAME: {
        access: "secret",
        context: "server",
        type: "string",
      },
    },
  },
});
