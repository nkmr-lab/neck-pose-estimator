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

    if (iOS) {
      const res = await requestPermission();
      try {
        if (res === "granted") {
          this.permitted = true;
        } else {
          this.permitted = false;
          throw new Error("Permission denied");
        }
      } catch (e) {
        this.permitted = false;
      }
    } else {
      this.permitted = true;
    }
    if (this.permitted && startFlag) {
      this.start();
    } else if (!this.permitted) {
      throw new Error("Orientation Sensor Permission denied");
    }
  }

  public start() {
    if (!window || !this.permitted) return;
    if (this.listener) {
      this.stop();
    }

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
