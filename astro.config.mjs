import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import mdx from "@astrojs/mdx";
import tina from "@tinacms/astro/integration";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "http://localhost:4321",
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [mdx(), tina()],
  vite: {
    plugins: [tailwindcss()],
  },
});
