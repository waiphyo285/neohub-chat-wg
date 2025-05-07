import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": {}, // fallback
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: `assets/[name].js`,
  //       chunkFileNames: `assets/[name].js`,
  //       assetFileNames: `assets/[name].[ext]`,
  //     },
  //   },
  // },
  // build: {
  //   lib: {
  //     entry: "src/VanillaWrapper.tsx",
  //     name: "NeoChat",
  //     fileName: (format) => `live-chat.${format}.js`,
  //   },
  //   rollupOptions: {
  //     external: ["react", "react-dom"],
  //     output: {
  //       globals: {
  //         react: "React",
  //         "react-dom": "ReactDOM",
  //       },
  //     },
  //   },
  // },
  build: {
    lib: {
      entry: "src/VanillaWrapper.tsx",
      name: "NeoChat",
      formats: ["umd"],
      fileName: () => "live-chat.umd.js",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        format: "umd",
        exports: "named",
      },
    },
  },
});
