import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { DeviceOrientationSensor } from "../DeviceOrientationSensor";

// Mocking browser environment
vi.stubGlobal("window", {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
});

const mockRequestPermission = vi.fn();
vi.stubGlobal("DeviceOrientationEvent", {
  requestPermission: mockRequestPermission,
});

describe("DeviceOrientationSensor", () => {
  let sensor: DeviceOrientationSensor;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("navigator", {
      userAgent: "iPhone OS 13_5 like Mac OS X",
    });
    sensor = new DeviceOrientationSensor();
  });

  describe("requestPermission", () => {
    it("should request permission and start listening on iOS when permission is granted", async () => {
      mockRequestPermission.mockResolvedValue("granted");
      await sensor.requestPermission();
      expect(mockRequestPermission).toHaveBeenCalledOnce();
      expect(window.addEventListener).toHaveBeenCalledWith(
        "deviceorientation",
        expect.any(Function),
      );
    });

    it("should reject if permission is denied on iOS", async () => {
      mockRequestPermission.mockResolvedValue("denied");
      await expect(sensor.requestPermission()).rejects.toThrow(
        "Permission denied for device orientation access",
      );
      expect(window.addEventListener).not.toHaveBeenCalled();
    });

    it("should reject if permission request promise is rejected on iOS", async () => {
      const error = new Error("API Error");
      mockRequestPermission.mockRejectedValue(error);
      await expect(sensor.requestPermission()).rejects.toThrow("API Error");
      expect(window.addEventListener).not.toHaveBeenCalled();
    });

    it("should handle non-iOS devices gracefully", async () => {
      vi.stubGlobal("navigator", {
        userAgent: "Android",
      });
      // Redefine DeviceOrientationEvent without requestPermission for non-iOS simulation
      const nonIosDeviceOrientationEvent = {};
      vi.stubGlobal("DeviceOrientationEvent", nonIosDeviceOrientationEvent);

      sensor = new DeviceOrientationSensor();
      await sensor.requestPermission();
      expect(mockRequestPermission).not.toHaveBeenCalled();
      expect(window.addEventListener).toHaveBeenCalledWith(
        "deviceorientation",
        expect.any(Function),
      );
    });
  });

  describe("start and stop", () => {
    it("should add and remove the event listener", async () => {
      mockRequestPermission.mockResolvedValue("granted");
      await sensor.requestPermission(false); // prevent auto-start
      sensor.start();
      expect(window.addEventListener).toHaveBeenCalledWith(
        "deviceorientation",
        expect.any(Function),
      );
      sensor.stop();
      expect(window.removeEventListener).toHaveBeenCalledWith(
        "deviceorientation",
        expect.any(Function),
      );
    });
  });

  describe("get", () => {
    it("should return the current orientation", async () => {
      mockRequestPermission.mockResolvedValue("granted");
      await sensor.requestPermission(); // This will call start()

      const mockEvent = { alpha: 10, beta: 20, gamma: 30 };
      const listener = (window.addEventListener as Mock).mock.calls[0][1];
      listener(mockEvent);

      const orientation = sensor.get();
      expect(orientation.alpha).toBe(10);
      expect(orientation.beta).toBe(20);
      expect(orientation.gamma).toBe(30);
    });

    it("should apply osCorrection for Android", async () => {
      vi.stubGlobal("navigator", {
        userAgent: "Android",
      });
      const nonIosDeviceOrientationEvent = {};
      vi.stubGlobal("DeviceOrientationEvent", nonIosDeviceOrientationEvent);
      sensor = new DeviceOrientationSensor();
      await sensor.requestPermission(false); // Don't start automatically
      sensor.start();

      const mockEvent = { alpha: 10, beta: 20, gamma: 30 };
      const listener = (window.addEventListener as Mock).mock.calls[0][1];
      listener(mockEvent);

      const orientation = sensor.get();
      expect(orientation.alpha).toBe(100); // 10 + 90
    });
  });
});
