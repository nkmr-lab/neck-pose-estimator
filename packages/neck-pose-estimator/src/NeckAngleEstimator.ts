import { DeviceOrientationSensor } from "./DeviceOrientationSensor";
import { FaceCapture, type CaptureResult } from "./FaceCapture";
import { useApiClient } from "./utils/api-client";
import { components, paths } from "./types/api-schema";
import { ApiError, OpArgType, OpReturnType } from "openapi-typescript-fetch";
import { EstimateResult } from "./types/estimate";
import { login, LoginConfig } from "./utils";

export type UserInfo = Pick<
  components["schemas"]["User"],
  "name" | "email" | "standardPostureId" | "iconUrl" | "createdAt" | "updatedAt"
>;

export class NeckAngleEstimator {
  public sensor: DeviceOrientationSensor;
  private user: components["schemas"]["User"] | null = null;
  private loginOnStart: boolean = false;
  private faceCapture: FaceCapture;
  private calibrationThreshold: number = 5;
  private enforceCalibration: boolean = false;
  private apiBaseUrl: string;
  private appId: string;
  private interval: number;
  private onEstimateCallback: ((result: EstimateResult) => void) | null = null;
  private onErrorCallback: ((error: ApiError | Error) => void) | null = null;
  private onLoginCallback: ((user: UserInfo) => void) | null = null;
  private loginConfig: LoginConfig = {
    basic: true,
    google: false,
  };

  constructor(options: {
    apiBaseUrl: string;
    appId: string;
    width?: number;
    height?: number;
    interval?: number;
    container?: HTMLElement | string;
    loginOnInit?: boolean;
    loginOnStart?: boolean;
    loginCallback?: ((user: UserInfo) => void) | null;
    calibrateThreshold?: number;
    enforceCalibration?: boolean;
    hideVideo?: boolean;
    loginConfig?: LoginConfig;
  }) {
    this.apiBaseUrl = options.apiBaseUrl;
    this.appId = options.appId;
    this.interval = options.interval ?? 500;
    this.calibrationThreshold = options.calibrateThreshold ?? 5;
    this.loginConfig = {
      basic: options.loginConfig?.basic ?? this.loginConfig.basic,
      google: options.loginConfig?.google ?? this.loginConfig.google,
    };
    this.onLoginCallback = options.loginCallback ?? null;

    this.faceCapture = new FaceCapture(
      options.container,
      options.width ?? null,
      options.height ?? null,
      {
        hideVideo: options.hideVideo ?? false,
      },
    );
    this.sensor = new DeviceOrientationSensor();
    useApiClient(
      this.apiBaseUrl,
      this.appId,
      ["/user/login", "get"],
      () => null,
    )
      .then((user) => {
        if (!(user instanceof Error) && user !== null) {
          this.user = user as OpReturnType<paths["/user/login"]["get"]>;
          this.onLoginCallback?.(this.getUserInfo() as UserInfo);
        } else {
          throw new Error("Failed to fetch user data on initialization");
        }
      })
      .catch((err) => {
        if (options.loginOnInit && this.user === null) {
          login(this.apiBaseUrl, this.appId, this.loginConfig).then((user) => {
            if (user) {
              this.user = user;
              this.onLoginCallback?.(this.getUserInfo() as UserInfo);
            } else {
              console.warn("User login failed, proceeding as guest.");
              this.user = null;
            }
          });
        }
      });
    if (options.loginOnStart) {
      this.loginOnStart = true;
    }
  }

  async start() {
    const videoOk = await this.faceCapture.start();
    if (!videoOk) throw new Error("Camera permission denied");

    // NOTE: ユーザの明示的なアクションがあった場合に直接呼び出さなければならないため、コメントアウト
    //       ライブラリの利用側でinstance.sensor.requestPermission()を呼び出すこと
    // try {
    //   await this.sensor.requestPermission();
    // } catch (err) {
    //   console.error("Device orientation permission denied:", err);
    //   throw new Error(`Device orientation permission denied: ${err}`);
    // }
    if (!this.sensor.isPermitted()) {
      const errorMessage = "Access to device orientation is not allowed";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (this.loginOnStart && this.user === null) {
      const user = await login(this.apiBaseUrl, this.appId, this.loginConfig);
      if (user) {
        this.user = user;
        this.onLoginCallback?.(this.getUserInfo() as UserInfo);
      } else {
        console.warn("User login failed, proceeding as guest.");
        this.user = null;
      }
    }

    // intervalごとに推定を実行
    this.faceCapture.onCapture(this.interval, async (capture) => {
      await this.handleEstimate(capture);
    });
  }

  stop() {
    this.faceCapture.stop();
    this.sensor.stop();
  }

  onEstimate(callback: (result: EstimateResult) => void) {
    this.onEstimateCallback = callback;
  }

  onError(callback: (error: any) => void) {
    this.onErrorCallback = callback;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  hadCalibrated(): boolean {
    return this.user === null || this.user.standardPostureId !== null;
  }

  getUserInfo(): UserInfo | null {
    return this.user
      ? {
          name: this.user.name,
          email: this.user.email,
          standardPostureId: this.user.standardPostureId,
          createdAt: this.user.createdAt,
          updatedAt: this.user.updatedAt,
          iconUrl: this.user.iconUrl,
        }
      : null;
  }

  private async handleEstimate(capture: CaptureResult) {
    if (
      this.enforceCalibration &&
      this.user &&
      this.user.standardPostureId === null
    ) {
      await this.handleCalibrate(capture);
      return;
    }
    try {
      const sensor = this.sensor.get();
      const formData = new FormData();
      formData.append("file", capture.file);
      formData.append("sensors", JSON.stringify(sensor));

      const res =
        this.user === null
          ? await useApiClient(
              this.apiBaseUrl,
              this.appId,
              ["/posture/estimate/guest", "post"],
              () =>
                formData as unknown as OpArgType<
                  paths["/posture/estimate/guest"]["post"]
                >,
            )
          : await useApiClient(
              this.apiBaseUrl,
              this.appId,
              ["/posture/estimate", "post"],
              () =>
                formData as unknown as OpArgType<
                  paths["/posture/estimate"]["post"]
                >,
              {},
              {
                query: {
                  enforce_calibration: this.enforceCalibration,
                },
              },
            );

      if (res instanceof Error) {
        this.onErrorCallback?.(res);
        return;
      }
      const data: EstimateResult = res as EstimateResult;
      this.onEstimateCallback?.(data);
    } catch (err) {
      this.onErrorCallback?.(err as Error);
    }
  }

  private async handleCalibrate(capture: CaptureResult) {
    const sensor = this.sensor.get();
    const formData = new FormData();
    formData.append("file", capture.file);
    formData.append("sensors", JSON.stringify(sensor));

    if (this.user === null) {
      console.warn("User not logged in, proceeding as guest.");
      return;
    }
    if (this.user.standardPostureId !== null) {
      console.warn("Standard posture already exists, cannot calibrate.");
      return;
    }

    const feature = await useApiClient(
      this.apiBaseUrl,
      this.appId,
      ["/posture/estimate/feature", "post"],
      () =>
        formData as unknown as OpArgType<
          paths["/posture/estimate/feature"]["post"]
        >,
    );
    if (feature instanceof Error || feature === null) {
      console.error("Failed to extract feature for calibration:", feature);
      this.onErrorCallback?.(feature);
      return;
    }
    if (
      Math.abs(feature.facePitch ?? 360) <= this.calibrationThreshold &&
      Math.abs(feature.faceYaw ?? 360) <= this.calibrationThreshold &&
      Math.abs(feature.faceRoll ?? 360) <= this.calibrationThreshold &&
      Math.abs(feature.sensorBeta ?? 360) <= this.calibrationThreshold
    ) {
      try {
        const calibrate = await useApiClient(
          this.apiBaseUrl,
          this.appId,
          ["/user/calibrate", "put"],
          () =>
            ({ standardPostureId: feature.id }) as OpArgType<
              paths["/user/calibrate"]["put"]
            >,
        );
        if (calibrate instanceof Error || calibrate === null) {
          console.error("Failed to calibrate user posture:", calibrate);
        } else {
          this.user.standardPostureId = calibrate.id;
        }
      } catch (err) {
        console.error("Failed to calibrate user posture:", err);
      }
    }
    this.onEstimateCallback?.(feature);
  }
}
