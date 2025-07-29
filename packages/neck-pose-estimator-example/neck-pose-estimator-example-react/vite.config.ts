import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = (process.env.VITE_API_BASE_URL =
    env.VITE_API_BASE_URL || "http://localhost:3000");

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      https: {
        key: fs.readFileSync(
          path.resolve(__dirname, "../certs/localhost-key.pem")
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, "../certs/localhost.pem")
        ),
      },
    },
    resolve: {
      alias: {
        "neck-pose-estimator": path.resolve(
          __dirname,
          "../../neck-pose-estimator/src"
        ),
      },
    },
    optimizeDeps: {
      include: ["neck-pose-estimator"],
      force: true,
    },
  };
});
