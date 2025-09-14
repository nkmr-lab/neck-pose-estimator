import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { NeckAngleEstimator } from "../NeckAngleEstimator"; // Assuming the class name is NeckAngleEstimator
import { FaceCapture } from "../FaceCapture";
import { DeviceOrientationSensor } from "../DeviceOrientationSensor";
import * as apiClient from "../utils/api-client";
import * as auth from "../utils/login";
import { userFixture } from "./fixture/user";
import { postureFixture } from "./fixture/posture";

// Mock dependencies
vi.mock("../FaceCapture");
vi.mock("../DeviceOrientationSensor");
vi.mock("../utils/api-client");
vi.mock("../utils/basicLogin");

describe("NeckAngleEstimator", () => {
  let estimator: NeckAngleEstimator;
  const mockUseApiClient = vi.spyOn(apiClient, "useApiClient");
  const mockLogin = vi.spyOn(auth, "login");

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock implementations
    (FaceCapture as Mock).mockImplementation(() => ({
      start: vi.fn().mockResolvedValue(true),
      stop: vi.fn(),
      onCapture: vi.fn(),
    }));

    (DeviceOrientationSensor as Mock).mockImplementation(() => ({
      requestPermission: vi.fn().mockResolvedValue(undefined),
      start: vi.fn(),
      stop: vi.fn(),
      get: vi.fn().mockReturnValue({ alpha: 0, beta: 0, gamma: 0 }),
    }));

    mockUseApiClient.mockResolvedValue(userFixture.notCalibrated);
    mockLogin.mockResolvedValue(userFixture.notCalibrated);

    estimator = new NeckAngleEstimator({
      apiBaseUrl: "http://localhost:3000",
      appId: "test-app",
    });
  });

  it("should initialize FaceCapture and DeviceOrientationSensor", () => {
    expect(FaceCapture).toHaveBeenCalledOnce();
    expect(DeviceOrientationSensor).toHaveBeenCalledOnce();
  });

  it("should start face capture and sensor on start()", async () => {
    await estimator.start();
    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    const sensorInstance = (DeviceOrientationSensor as Mock).mock.results[0]
      .value;

    expect(faceCaptureInstance.start).toHaveBeenCalledOnce();
    expect(sensorInstance.requestPermission).toHaveBeenCalledOnce();
  });

  it("should call onCapture and set up interval", async () => {
    await estimator.start();
    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    expect(faceCaptureInstance.onCapture).toHaveBeenCalledWith(
      500,
      expect.any(Function),
    );
  });

  it("should handle estimation when a frame is captured", async () => {
    const onEstimateCallback = vi.fn();
    estimator.onEstimate(onEstimateCallback);

    await estimator.start();

    // Get the onCapture callback
    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    const onCaptureCallback = faceCaptureInstance.onCapture.mock.calls[0][1];

    const mockCaptureResult = {
      file: new File([], "test.jpg"),
      timestamp: Date.now(),
    };
    mockUseApiClient.mockResolvedValue(postureFixture.posture);

    await onCaptureCallback(mockCaptureResult);

    expect(mockUseApiClient).toHaveBeenCalledWith(
      "http://localhost:3000",
      "test-app",
      ["/posture/estimate", "post"],
      expect.any(Function),
      {},
      {
        query: {
          enforce_calibration: false,
        },
      },
    );
    expect(onEstimateCallback).toHaveBeenCalledWith(postureFixture.posture);
  });

  it("should call onError callback when handleEstimate fails", async () => {
    const onErrorCallback = vi.fn();
    estimator.onError(onErrorCallback);
    const apiError = new Error("API failure");
    mockUseApiClient.mockResolvedValue(apiError);

    await estimator.start();
    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    const onCaptureCallback = faceCaptureInstance.onCapture.mock.calls[0][1];
    const mockCaptureResult = {
      file: new File([], "test.jpg"),
      timestamp: Date.now(),
    };

    await onCaptureCallback(mockCaptureResult);

    expect(onErrorCallback).toHaveBeenCalledWith(apiError);
  });

  it("should throw an error if camera permission is denied", async () => {
    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    faceCaptureInstance.start.mockResolvedValue(false);

    await expect(estimator.start()).rejects.toThrow("Camera permission denied");
  });

  it("should throw an error if device orientation permission is denied", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const sensorInstance = (DeviceOrientationSensor as Mock).mock.results[0]
      .value;
    const error = new Error("Permission denied by user");
    sensorInstance.requestPermission.mockRejectedValue(error);

    await expect(estimator.start()).rejects.toThrow(
      `Device orientation permission denied: ${error}`,
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should attempt to login on start if loginOnStart is true and user is not logged in", async () => {
    // Simulate user not being logged in initially
    mockUseApiClient.mockResolvedValueOnce(null);
    estimator = new NeckAngleEstimator({
      apiBaseUrl: "http://localhost:3000",
      appId: "test-app",
      loginOnStart: true,
    });
    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    const sensorInstance = (DeviceOrientationSensor as Mock).mock.results[0]
      .value;
    faceCaptureInstance.start.mockResolvedValue(true);
    sensorInstance.requestPermission.mockResolvedValue();

    await estimator.start();

    expect(mockLogin).toHaveBeenCalledOnce();
  });

  it("should stop everything on stop()", async () => {
    await estimator.start();
    estimator.stop();

    const faceCaptureInstance = (FaceCapture as Mock).mock.results[0].value;
    const sensorInstance = (DeviceOrientationSensor as Mock).mock.results[0]
      .value;

    expect(faceCaptureInstance.stop).toHaveBeenCalledOnce();
    expect(sensorInstance.stop).toHaveBeenCalledOnce();
  });
});
