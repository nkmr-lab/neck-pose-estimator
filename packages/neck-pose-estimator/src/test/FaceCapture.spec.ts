import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { FaceCapture } from "../FaceCapture";

// --- Mocks Setup ---
const mockContainer = {
  appendChild: vi.fn(),
};

vi.stubGlobal(
  "File",
  vi.fn((blob, fileName) => ({ blob, fileName })),
);

vi.stubGlobal("document", {
  createElement: vi.fn().mockImplementation((tag) => {
    if (tag === "video") {
      return {
        style: {},
        play: vi.fn(),
        pause: vi.fn(),
        srcObject: null,
        paused: false,
        ended: false,
        videoWidth: 320,
        videoHeight: 240,
      };
    }
    if (tag === "canvas") {
      return {
        getContext: vi.fn(() => ({ drawImage: vi.fn() })),
        toBlob: vi.fn((callback) => {
          const blob = new Blob(["mock"], { type: "image/jpeg" });
          callback(blob);
        }),
      };
    }
    return {}; // Default mock for other elements
  }),
  getElementById: vi.fn().mockReturnValue(mockContainer),
  body: {
    appendChild: vi.fn(), // Mock body as well to avoid potential errors
  },
});

vi.stubGlobal("navigator", {
  mediaDevices: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [{ stop: vi.fn() }],
    }),
  },
});

vi.stubGlobal("window", {
  setInterval: vi.fn(),
  clearInterval: vi.fn(),
});

// --- Tests ---
describe("FaceCapture", () => {
  let faceCapture: FaceCapture;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Pass a string ID to the constructor, which will be handled by the mocked getElementById
    faceCapture = new FaceCapture("test-container", 320, 240);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a video element and attach it to the container", () => {
    expect(document.getElementById).toHaveBeenCalledWith("test-container");
    expect(document.createElement).toHaveBeenCalledWith("video");
    expect(mockContainer.appendChild).toHaveBeenCalledOnce();
  });

  it("should start the video stream", async () => {
    await faceCapture.start();
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      audio: false,
      video: {
        facingMode: "user",
        width: 320,
        height: 240,
        aspectRatio: 320 / 240,
      },
    });
  });

  it("should return false and log error if getUserMedia fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("Permission denied");
    (navigator.mediaDevices.getUserMedia as Mock).mockRejectedValue(error);

    const result = await faceCapture.start();

    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    consoleErrorSpy.mockRestore();
  });

  it("should stop the video stream", async () => {
    const mockTrack = { stop: vi.fn() };
    (navigator.mediaDevices.getUserMedia as Mock).mockResolvedValue({
      getTracks: () => [mockTrack],
    });
    await faceCapture.start();
    faceCapture.stop();
    expect(mockTrack.stop).toHaveBeenCalled();
  });

  it("should call the callback on capture interval", async () => {
    const callback = vi.fn();
    faceCapture.onCapture(1000, callback);

    const intervalCallback = (window.setInterval as Mock).mock.calls[0][0];
    await intervalCallback();

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.any(Object),
        timestamp: expect.any(Number),
      }),
    );
  });
});
