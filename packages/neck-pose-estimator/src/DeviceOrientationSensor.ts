import { Orientation, DeviceOrientationEventiOS, Euler } from "./types";

export class DeviceOrientationSensor {
  private orientation: Orientation = {
    alpha: null,
    beta: null,
    gamma: null,
  };
  private osCorrection: number = 0; // to correct alpha value on Android device
  private permitted: boolean = false;
  private updatedAt: Date | null = null;
  private listener: ((orientation: DeviceOrientationEvent) => void) | null =
    null;

  constructor() {}

  public async requestPermission(startFlag: boolean = true): Promise<void> {
    const requestPermission = (
      DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
    ).requestPermission;
    const iOS = typeof requestPermission === "function";
    if (navigator && navigator.userAgent) {
      this.osCorrection =
        navigator.userAgent.indexOf("Android") === -1 ? 0 : 90;
    }

    return new Promise((resolve, reject) => {
      if (iOS) {
        requestPermission()
          .then((res) => {
            if (res === "granted") {
              this.permitted = true;
              if (startFlag) {
                this.start();
              }
            } else {
              reject(
                new Error("Permission denied for device orientation access"),
              );
            }
            resolve();
          })
          .catch((e) => {
            this.permitted = false;
            reject(e);
          });
      } else {
        this.permitted = true;
        if (startFlag) {
          this.start();
        }
        resolve();
      }
    });
  }

  public start() {
    if (!window || !this.permitted) return;

    this.listener = (e: DeviceOrientationEvent) => {
      const alpha = e.alpha ? (e.alpha + this.osCorrection) % 360 : null;
      const beta = e.beta;
      const gamma = e.gamma;
      this.orientation = { alpha, beta, gamma };
      this.updatedAt = new Date();
    };
    window.addEventListener("deviceorientation", this.listener);
  }

  public stop() {
    if (!this.listener) return;
    window.removeEventListener("deviceorientation", this.listener);
    this.listener = null;
  }

  public getFromEvent(orientationEvent: DeviceOrientationEvent): Orientation {
    const alpha: number =
      (orientationEvent.alpha || 0) + (this.osCorrection % 360);
    const beta: number = orientationEvent.beta || 0;
    const gamma: number = orientationEvent.gamma || 0;
    return { alpha, beta, gamma };
  }

  public get(): Orientation {
    return this.orientation;
  }
}
