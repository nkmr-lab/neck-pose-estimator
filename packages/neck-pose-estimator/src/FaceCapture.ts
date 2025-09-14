import { dateFormat, generateRandomId } from "./utils/common";

export type CaptureResult = {
  file: File;
  timestamp: number;
};

export class FaceCapture {
  private video: HTMLVideoElement;
  private container: HTMLElement;
  private stream: MediaStream | null = null;
  private intervalId: number | null = null;

  private readonly ID_PREFIX = "face-capture-";
  private readonly ID_LENGTH = 8;

  constructor(
    private _container: HTMLElement | string | undefined,
    private width: number | null = 320,
    private height: number | null = 240,
    private options?: {
      hideVideo?: boolean;
    },
  ) {
    if (!document || !window) {
      throw new Error("FaceCapture requires a browser environment.");
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "getUserMedia is not supported in this browser. Please use a modern browser.",
      );
    }
    if (typeof _container === "string") {
      const target = document.getElementById(_container);
      if (target === null) {
        throw new Error(`Element with id "${_container}" not found.`);
      }
      this.container = target;
    } else if (_container instanceof HTMLElement) {
      this.container = _container;
    } else {
      this.container = document.body; // デフォルトはbody要素
    }
    this.width = width;
    this.height = height;
    this.video = document.createElement("video");
    this.video.width = this.width ?? 0;
    this.video.height = this.height ?? 0;
    this.video.id = `${this.ID_PREFIX}-${generateRandomId(this.ID_LENGTH)}`;
    Object.assign(this.video, {
      muted: true,
      autoplay: true,
      playsInline: true,
      width,
      height,
    });
    this.video.style.objectFit = "cover";
    this.video.style.transform = "scaleX(-1)";
    if (this.options?.hideVideo) {
      this.video.style.position = "absolute";
      this.video.style.top = "0";
      this.video.style.left = "0";
      this.video.style.opacity = "0";
      this.video.style.pointerEvents = "none";
      this.video.style.zIndex = "-1"; // 背面に配置
    }
    this.attachTo(this.container);
  }

  attachTo(container: HTMLElement) {
    container.appendChild(this.video);
  }

  getVideoSizeConfig() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS
      ? {
          width: this.width ?? { ideal: document.body.clientWidth },
          height: this.height ?? { ideal: document.body.clientHeight },
        }
      : {
          ...(this.width === null ? {} : { width: this.width }),
          ...(this.height === null ? {} : { height: this.height }),
          ...(this.width === null || this.height === null
            ? {}
            : { aspectRatio: this.width / this.height }),
        };
  }

  async start(): Promise<boolean> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          // width: { min: 0, max: this.width },
          // height: { min: 0, max: this.height },
          // aspectRatio: {
          //   exact: this.height / this.width,
          // },
          ...this.getVideoSizeConfig(),
        },
      });
      this.video.srcObject = this.stream;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  stop() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onCapture(interval: number, callback: (result: CaptureResult) => void) {
    this.intervalId = window.setInterval(async () => {
      if (!this.video || this.video.paused || this.video.ended) return;
      const now = Date.now();
      const file = await this.captureFrame(new Date(now));
      if (file) callback({ file, timestamp: now });
    }, interval);
  }

  private async captureFrame(now: Date): Promise<File | null> {
    const canvas = document.createElement("canvas");
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(this.video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(null);
          const fileName = dateFormat(now).replace(/\//, "-").replace(/ /, "_");
          resolve(new File([blob], `${fileName}.jpg`));
        },
        "image/jpeg",
        0.8,
      );
    });
  }
}
