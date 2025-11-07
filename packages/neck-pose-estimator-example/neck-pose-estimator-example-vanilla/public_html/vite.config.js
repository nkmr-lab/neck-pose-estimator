import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "__index.js",
      name: "NeckPoseEstimator",
      fileName: "neck-pose-estimator",
    },
  },
});
