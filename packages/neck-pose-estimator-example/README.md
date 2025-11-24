# Neck Pose Estimator - Examples

This directory contains sample applications demonstrating how to use the `neck-pose-estimator` library.

## Included Samples

- **`neck-pose-estimator-example-react`**: A sample application built with React and Vite. It demonstrates the basic way to integrate the library and display the video feed and estimation results.
- **`neck-pose-estimator-example-vanilla`**: A sample application built with vanilla JavaScript. It demonstrates the basic way to integrate the library and display the video feed and estimation results.

## How to Run the React Samples

First, set up the environment variables.
Create a `.env.local` file and add the following content:

```env
VITE_API_BASE_URL=https://your-api.example.com
VITE_APP_ID=your-app-id
```

Set `VITE_API_BASE_URL` to the base URL of the pose estimation API. Set `VITE_APP_ID` to your application ID.

**Note:** This application requires an **HTTPS** context to access the camera and device orientation sensors. The Vite development server can be configured to run over HTTPS by providing self-signed certificates.

To create self-signed certificates, first install `mkcert`.
On macOS, you can install it using Homebrew:

```bash
brew install mkcert
```

On Windows, you can install it using winget:

```powershell
winget install mkcert
```

Next, generate the local certificate authority and root certificate:

```bash
mkcert --install
mkcert -CAROOT
```

Then, generate a self-signed certificate for localhost:

```bash
mkcert localhost
```

This command will generate two files: `localhost.pem` and `localhost-key.pem`.
Move these files to the [certs](./certs) directory.
You can reference these files in the `server.https` option in `vite.config.ts` to start the development server over HTTPS.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { join } from "path";
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: readFileSync(join(__dirname, "../certs", "localhost-key.pem")),
      cert: readFileSync(join(__dirname, "../certs", "localhost.pem")),
    },
    host: "0.0.0.0",
  },
});
```

To run the samples, navigate to the monorepo root directory and execute the following command:

```bash
pnpm -F neck-pose-estimator-example-react dev
```
