import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        personajes: "./src/page/personajes.html",
        planetas: "./src/page/planetas.html",
        favoritos: "./src/page/favoritos.html",
      },
    },
  },
});
