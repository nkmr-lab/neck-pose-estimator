import { useEffect, useRef, useCallback, useState } from "react";
import "./App.css";
import {
  ApiError,
  NeckAngleEstimator,
  type EstimateResult,
} from "@nkmr-lab/neck-pose-estimator";

function App() {
  const estimator = useRef<NeckAngleEstimator | null>(null);
  const [hadInitialized, setHadInitialized] = useState<boolean>(false);
  const [neckAngle, setNeckAngle] = useState<number | null>(null);
  const [posture, setPosture] = useState<EstimateResult | null>(null);

  useEffect(() => {
    return () => {
      estimator.current?.stop();
    };
  }, []);

  const initEstimator = useCallback(() => {
    const apiBaseUrl = "/api";
    const appId = import.meta.env.VITE_API_APP_ID || "";

    estimator.current = new NeckAngleEstimator({
      apiBaseUrl,
      appId,
      width: 320,
      height: 240,
      container: "estimator-container",
      interval: 1000,
      loginOnInit: true,
      loginOnStart: false,
      calibrateThreshold: 5,
      hideVideo: false,
    });
    estimator.current.sensor.requestPermission(false);
    setHadInitialized(true);
  }, []);

  const handleEstimated = useCallback((result: EstimateResult | null) => {
    console.log("Estimated result:", result);
    if (result?.neckAngle) {
      setNeckAngle(result.neckAngle);
      setPosture(result);
    }
  }, []);
  const handleError = useCallback((error: ApiError | Error) => {
    console.error("Error during estimation:", error);
    setNeckAngle(null);
    setPosture(null);
  }, []);

  const handleStart = useCallback(async () => {
    if (!estimator.current) return;
    try {
      await estimator.current.start();
      estimator.current.onEstimate(handleEstimated);
      estimator.current.onError(handleError);
    } catch (error) {
      console.error("Failed to start estimator:", error);
    }
  }, [handleEstimated, handleError]);

  const handleStop = useCallback(() => {
    estimator.current?.stop();
  }, []);

  return (
    <>
      <div id="estimator-container"></div>
      {!hadInitialized ? (
        <button onClick={initEstimator}>アクセスを許可</button>
      ) : (
        <>
          <div>
            <button onClick={handleStart}>スタート</button>
            <button onClick={handleStop}>ストップ</button>
            {estimator.current?.hadCalibrated() ? (
              <p>現在の首の角度: {neckAngle ?? 0}</p>
            ) : (
              <>
                <p>キャリブレーション中...</p>
                <p>
                  スマートフォンをまっすぐ持ち，首をできる限りまっすぐにしてください
                </p>
              </>
            )}
            <p>{posture?.facePitch}</p>
          </div>
        </>
      )}
    </>
  );
}

export default App;
