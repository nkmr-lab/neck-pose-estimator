# Neck Angle Estimator (neck-pose-estimator)

This library provides the `NeckAngleEstimator` class, which estimates the user's neck pose by capturing the user's face image and collecting device tilt data. The collected data is sent to a backend service for analysis, returning the estimated pose angle.

## Key Features

- Capture video from the user's camera
- Access device tilt sensor data
- Simple API to start/stop the pose estimation process
- User authentication and pose calibration processing
- Event notification on successful estimation and error occurrence

## Notes

- This library uses a webcam and device sensors, so it only works in an HTTPS environment.
  - It is recommended to create a self-signed certificate using `mkcert` or similar and set up an HTTPS server during development.
  - Also, since using device sensors requires a clear user action such as a click, you need to call the `NeckAngleEstimator`'s `sensor.requestPermission()` method directly.
- An `App-ID` is required to use this library.
  - You can register and obtain an `App-ID` from the pose estimation API application form.
  - Please manage the `App-ID` carefully as it is issued only once.
- This library depends on the [Pose Estimation API Backend](https://github.com/kntWT/posture-correction-backend).
  - Please contact the administrator if there is a version mismatch in the api schema.
- This library accesses `document` and `window` objects upon instantiation, so it does not work in a Server-Side Rendering (SSR) environment. Please use it only on the client side.

## Installation

make `.npmrc` file to set up the registry, and set the `GITHUB_TOKEN` environment variable with a GitHub Personal Access Token that has the `read:packages` scope. (it may not be necessary if the package is public but it is recommended to set up for avoiding any issues)

```.npmrc
@nkmr-lab:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then, install the package via npm, yarn, or pnpm.

```bash
npm install @nkmr-lab/neck-pose-estimator
# or
yarn add  @nkmr-lab/neck-pose-estimator
# or
pnpm add  @nkmr-lab/neck-pose-estimator
```

## Basic Usage

Basic usage example of `NeckAngleEstimator`.

### Using with ESM, etc.

You can import and use `NeckAngleEstimator` as an ESM module.

```javascript:main.js
import { NeckAngleEstimator } from "@nkmr-lab/neck-pose-estimator";

// Get the container element to display the video
const videoContainer = document.getElementById("video-container");

// Instantiate the Estimator
const estimator = new NeckAngleEstimator({
  apiBaseUrl: "https://your-api-domain.com/path/to/api", // API base URL, need to proxy considering CORS
  appId: "your-app-id", // Application ID
  container: videoContainer, // (Optional) Element to append video. Default is document.body
  loginOnStart: true, // (Optional) Whether to require login on start(). Default is false
});

/**
 * Set event listener
 * @param {object} result - Estimation result
 *   @param {number} result.neckAngle - Estimated neck angle (in degrees)
 */
estimator.onEstimate((result) => {
  if (result.neckAngle === null) {
    // Neck angle is not estimated during calibration
    console.log("Calibrating");
  } else {
    console.log("Estimated neck angle:", result.neckAngle);
  }
});

/**
 * Set error listener
 * @param {Error} error - Occurred error
 */
estimator.onError((error) => {
  console.error("Estimation error:", error);
});

// Start estimation process
async function startEstimation() {
  try {
    await estimator.sensor.requestPermission(); // Request sensor permission
    await estimator.start();
    console.log("Estimation started.");
  } catch (error) {
    console.error("Failed to start estimation:", error);
    // Handle errors such as camera or sensor permission denied
  }
}
document
  .getElementById("start-button")
  .addEventListener("click", startEstimation);

// To stop estimation
function stopEstimation() {
  estimator.stop();
}
document
  .getElementById("stop-button")
  .addEventListener("click", stopEstimation);
```

### Using with vanilla JavaScript

If you use the npm package with vanilla js, you need to build it using a bundle tool.
Here is an example of building using Vite.

```javascript:__index.js
import { NeckAngleEstimator } from "@nkmr-lab/neck-pose-estimator";
window.NeckAngleEstimator = NeckAngleEstimator; // To register globally
```

```javascript:vite.config.js
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
```

```html:index.html
<!DOCTYPE html>
<html lang="ja"></html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neck Angle Estimator Example</title>
  <!-- Load built js file -->
  <script defer src="/dist/neck-pose-estimator.umd.js"></script>
  <script defer src="./main.js"></script>
</head>
<body>
  <h1>Neck Angle Estimator Example</h1>
  <div id="video-container"></div>
  <p>Video feed will be displayed.</p>
  <button id="start-button">Start Estimation</button>
  <button id="stop-button">Stop Estimation</button>
</body>
</html>
```

```javascript:main.js
// Get the container element to display the video
const videoContainer = document.getElementById("video-container");

// Instantiate the Estimator
const estimator = new NeckAngleEstimator({
  apiBaseUrl: "https://your-api.example.com", // API base URL
  appId: "your-app-id", // Application ID
  container: videoContainer, // (Optional) Element to append video. Default is document.body
  loginOnStart: true, // (Optional) Whether to require login on start(). Default is false
});

/**
 * Set event listener
 * @param {object} result - Estimation result, although null is allowed in type definition, estimation result always exists
 *   @param {number} result.id - Estimation result ID
 *   @param {number} result.userId - User ID
 *   @param {string | null} result.fileName - Captured image file name
 *   @param {number | null} result.neckAngle - Estimated neck angle (in degrees)
 *   @param {number | null} result.sensorAlpha - Device tilt sensor alpha value
 *   @param {number | null} result.sensorBeta - Device tilt sensor beta value
 *   @param {number | null} result.sensorGamma - Device tilt sensor gamma value
 *   @param {number | null} result.facePitch - Face pitch angle (in degrees)
 *   @param {number | null} result.faceYaw - Face yaw angle (in degrees)
 *   @param {number | null} result.faceRoll - Face roll angle (in degrees)
 *   @param {number | null} result.noseX - Nose X coordinate
 *   @param {number | null} result.noseY - Nose Y coordinate
 *   @param {number | null} result.neckX - Neck X coordinate
 *   @param {number | null} result.neckY - Neck Y coordinate
 *   @param {number | null} result.leftEyeX - Left eye X coordinate
 *   @param {number | null} result.leftEyeY - Left eye Y coordinate
 *   @param {number | null} result.rightEyeX - Right eye X coordinate
 *   @param {number | null} result.rightEyeY - Right eye Y coordinate
 *   @param {number | null} result.imageWidth - Captured image width
 *   @param {number | null} result.imageHeight - Captured image height
 *   @param {number | null} result.neckToNose - Distance from neck to nose (in pixels)
 *   @param {number | null} result.standardDistance - Standard distance (in pixels)
 *   @param {string | null} result.createdAt - Estimation result creation date (ISO 8601 format)
 *   @param {string} result.updatedAt - Estimation result update date (ISO 8601 format)
 *   @param {string} result.appId - Application ID
 * @returns {void}
 */
estimator.onEstimate((result) => {
  if (result.neckAngle === null) {
    // Neck angle is not estimated during calibration
    console.log("Calibrating");
  } else {
    if (result.neckAngle > 60) {
      console.warn("Neck angle is too large:", result.neckAngle);
    } else if (result.neckAngle > 30) {
      console.warn("Neck angle is slightly large:", result.neckAngle);
    } else if (result.neckAngle > 15) {
      console.log("Neck angle is normal:", result.neckAngle);
    } else {
      console.log("Neck angle is very good:", result.neckAngle);
    }
  }
});

/**
 * Set error listener
 * @param {Error | ApiError} error - Occurred error
 */
estimator.onError((error) => {
  if (data in error) {
    console.error("API Error:", error.data);
  } else {
    console.error("Estimation Error:", error);
  }
});

// Start estimation process, fired on button click
async function startEstimation() {
  try {
    await estimator.sensor.requestPermission(); // Request sensor permission
    await estimator.start();
    console.log("Estimation started.");
  } catch (error) {
    console.error("Failed to start estimation:", error);
    // Handle errors such as camera or sensor permission denied
  }
}
document
  .getElementById("start-button")
  .addEventListener("click", startEstimation);

// To stop estimation
function stopEstimation() {
  estimator.stop();
}
document
  .getElementById("stop-button")
  .addEventListener("click", stopEstimation);

```

## API Reference

### `new NeckAngleEstimator(options)`

Creates a new `NeckAngleEstimator` instance.

**Options:**

- `apiBaseUrl` (string, required): Base URL of the pose estimation API.
- `appId` (string, required): Application ID for the API.
- `container` (HTMLElement | string, optional): HTML element or its ID to append the video feed. Default is `document.body`.
- `width` (number, optional): Width of the video element. Default is `null` (auto).
- `height` (number, optional): Height of the video element. Default is `null` (auto).
- `interval` (number, optional): Data capture interval (milliseconds). Default is `500`.
- `calibrationThreshold` (number, optional): Threshold used for pose calibration (**Calibration fires when the device angle and the user's face angle relative to the device are all below this threshold**). Default is `5`.
- `enforceCalibration` (boolean, optional): If `true`, estimation does not start until calibration is complete. If calibration is not performed, estimation is performed using approximate values specified by the backend. Default is `false`.
- `hideVideo` (boolean, optional): If `true`, hides the video feed. Default is `false`.
- `loginOnInit` (boolean, optional): If `true`, prompts the user to login upon instantiation. Default is `false`.
- `loginOnStart` (boolean, optional): If `true`, prompts the user to login when `start()` is called. Default is `false`.
- `loginCallback` (function, optional): Callback function called upon successful login. Default is `null`.
- `loginConfig` (object, optional): Login method configuration.
  - `basic` (boolean, optional): Whether to use Basic authentication. Default is `true`.
  - `google` (boolean | object, optional): Whether to use Google authentication. Default is `false`.
    - `redirectPath` (string, optional): Redirect path after Google authentication. Default is `/`.
    - **May not work due to cross-origin cookie writing depending on the backend deployment destination**
    - **Please contact the administrator if you get an error saying the domain is not allowed after redirection**
    - **Note that in the case of Google login, it redirects only by writing a cookie instead of returning user information (It is recommended to send a `/user/login` request when rendering the page)**

### Methods

- `async start(): Promise<void>`: Requests necessary permissions (camera and device tilt) and starts the estimation process.
- `stop(): void`: Stops the camera feed, sensor listeners, and estimation interval.
- `onEstimate(callback: (result: EstimateResult) => void): void`: Registers a callback function called with the estimation result.
- `onError(callback: (error: Error) => void): void`: Registers a callback function called when an error occurs.
- `isLoggedIn(): boolean`: Returns `true` if the user is currently logged in.
- `hadCalibrated(): boolean`: Returns `true` if the user has calibrated the reference pose.
- `sensor.requestPermission(): Promise<void>`: Requests access permission to the device tilt sensor. **Call directly when there is an explicit user action.**
- `getUserInfo(): Promise<UserInfo | null>`: Gets the current user information (excluding `password` and `token`). Returns `null` if not logged in.
