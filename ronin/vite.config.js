import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    manifest: true,
    outDir: "static",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "assets/js/index.js"),
        main: resolve(__dirname, "assets/scss/main.scss"),
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (ext === "css") {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
