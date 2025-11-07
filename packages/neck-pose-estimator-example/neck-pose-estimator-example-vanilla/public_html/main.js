// 映像を表示するコンテナ要素を取得
const videoContainer = document.getElementById("video-container");

// Estimatorをインスタンス化
const estimator = new NeckAngleEstimator({
  apiBaseUrl: "/posture-api", // APIのベースURL
  appId: "<your_app_is>", // アプリケーションID
  container: videoContainer, // (任意) 映像を追記する要素。デフォルトは document.body
  interval: 1000, // (任意) 姿勢推定する頻度(ミリ秒)。デフォルトは500
  loginOnStart: true, // (任意) start()時にログインを要求するか。デフォルトは false
  loginConfig: { google: true },
});

/**
 * イベントリスナーを設定
 * @param {object} result - 推定結果，型定義上はnullを許容しているが推定結果は常に存在する
 *   @param {number | null} result.neckAngle - 推定された首の角度（度単位）
 * @returns {void}
 */
estimator.onEstimate((result) => {
  if (result.neckAngle === null) {
    return;
  }
  const resultElement = document.getElementById("neck-angle-result");
  resultElement.innerHTML = `現在の首の角度は${result.neckAngle}度です`;
  if (result.neckAngle > 60) {
    console.warn("首の角度が大きすぎます:", result.neckAngle);
  } else if (result.neckAngle > 30) {
    console.warn("首の角度が少し大きいです:", result.neckAngle);
  } else if (result.neckAngle > 15) {
    console.log("首の角度は正常です:", result.neckAngle);
  } else {
    console.log("首の角度がとても良いです:", result.neckAngle);
  }
});

/**
 * エラーリスナーを設定
 * @param {Error | ApiError} error - 発生したエラー
 */
estimator.onError((error) => {
  if ("data" in error) {
    console.error("APIエラー:", error.data);
  } else {
    console.error("推定エラー:", error);
  }
});

// 推定プロセスを開始，ボタンのクリック時に発火
async function startEstimation() {
  try {
    await estimator.sensor.requestPermission(); // センサーのパーミッションを要求
    await estimator.start();
    console.log("推定を開始しました。");
  } catch (error) {
    console.error("推定の開始に失敗しました:", error);
    // カメラやセンサーのパーミッションが拒否された場合などのエラーを処理
  }
}
document
  .getElementById("start-button")
  .addEventListener("click", startEstimation);

// 推定を停止する場合
function stopEstimation() {
  estimator.stop();
}
document
  .getElementById("stop-button")
  .addEventListener("click", stopEstimation);
