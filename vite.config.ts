import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 포트 3000으로 설정
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CopyPaste",
      fileName: (format) => `copy-paste.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
