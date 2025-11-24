# 首の角度推定ライブラリ (neck-pose-estimator)

このライブラリは、ユーザーの顔画像をキャプチャし、デバイスの傾きデータを収集することで、ユーザーの首の姿勢を推定する`NeckAngleEstimator`クラスを提供します。収集したデータは分析のためにバックエンドサービスに送信され、推定された姿勢角度を返します。

## 主な機能

- ユーザーのカメラから映像をキャプチャ
- デバイスの傾きセンサーデータへのアクセス
- 姿勢推定プロセスを開始・停止するためのシンプルなAPI
- ユーザー認証と姿勢のキャリブレーション処理
- 推定成功時およびエラー発生時のイベント通知

## 注意事項

- このライブラリはWebカメラとデバイスのセンサを利用するため，HTTPS環境でしか動作しません。
  - 開発時は`mkcert`などで自己証明書を作成し、HTTPSサーバーを立てることを推奨します。
  - また，デバイスのセンサを利用する際はクリックなどユーザの明確なアクションが必要なため，`NeckAngleEstimator`の`sensor.requestPermission()`メソッドを直接呼び出す必要があります。
- このライブラリの利用には`App-ID`が必要です．
  - `App-ID`は姿勢推定APIのアプリ申請フォームから登録し，取得できます。
  - その際，`App-ID`は1度しか発行されないため，慎重に管理してください。
- このライブラリは[姿勢推定APIのバックエンド](https://github.com/kntWT/posture-correction-backend)に依存しています。
  - api schemaのバージョンずれなどがあった場合は管理者に連絡してください。
- このライブラリはインスタンス作成時に`document`や`window`オブジェクトにアクセスするため、サーバーサイドレンダリング（SSR）環境では動作しません。クライアントサイドでのみ使用してください。

## インストール

このライブラリは`@nkmr-lab`のプライベートなnpmパッケージとして提供されています。そのため，`@nkmr-lab`にアクセス権限があるGitHubアカウントの[Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)を使用して、npmの認証を行う必要があります。
classicなtokenで、`read:packages`のスコープを持つトークンを作成してください。
pnpmを用いたモノレポの場合はプロジェクトルート，そうでない場合はライブラリを利用するフロントエンドアプリケーションのルートディレクトリに`.npmrc`ファイルを作成し、以下の内容を追加します。

```plaintext
@nkmr-lab:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

ここで、`${GITHUB_TOKEN}`はあなたのGitHub Personal Access Tokenに置き換えるか，自身の環境変数にセットしてください。
**直接書き換える場合はGitHubにpushしないように注意してください**

```bash
npm install @nkmr-lab/neck-pose-estimator
# or
yarn add  @nkmr-lab/neck-pose-estimator
# or
pnpm add  @nkmr-lab/neck-pose-estimator
```

## 基本的な使い方

`NeckAngleEstimator`の基本的な使用例です。

### ESMなどを使う場合

`NeckAngleEstimator`をESMモジュールとしてインポートし、使用することができます。

```javascript:main.js
import { NeckAngleEstimator } from "@nkmr-lab/neck-pose-estimator";

// 映像を表示するコンテナ要素を取得
const videoContainer = document.getElementById("video-container");

// Estimatorをインスタンス化
const estimator = new NeckAngleEstimator({
  apiBaseUrl: "https://your-api-domain.com/path/to/api", // APIのベースURL，CORSを考慮するとプロキシする必要がある
  appId: "your-app-id", // アプリケーションID
  container: videoContainer, // (任意) 映像を追記する要素。デフォルトは document.body
  loginOnStart: true, // (任意) start()時にログインを要求するか。デフォルトは false
});

/**
 * イベントリスナーを設定
 * @param {object} result - 推定結果
 *   @param {number} result.neckAngle - 推定された首の角度（度単位）
 */
estimator.onEstimate((result) => {
  if (result.neckAngle === null) {
    // キャリブレーションのた中は首の角度が推定されない
    console.log("キャリブレーション中です");
  } else {
    console.log("推定された首の角度:", result.neckAngle);
  }
});

/**
 * エラーリスナーを設定
 * @param {Error} error - 発生したエラー
 */
estimator.onError((error) => {
  console.error("推定エラー:", error);
});

// 推定プロセスを開始
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
```

### 素のJavaScriptで使う場合

素のjsでnpm packageを使う場合はバンドルツールを使ってビルドする必要があります。
以下は、Viteを使用してビルドする例です。

```javascript:__index.js
import { NeckAngleEstimator } from "@nkmr-lab/neck-pose-estimator";
window.NeckAngleEstimator = NeckAngleEstimator; // グローバルに登録する場合
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
  <!-- ビルドされたjsファイルを読み込む -->
  <script defer src="/dist/neck-pose-estimator.umd.js"></script>
  <script defer src="./main.js"></script>
</head>
<body>
  <h1>Neck Angle Estimator Example</h1>
  <div id="video-container"></div>
  <p>カメラの映像が表示されます。</p>
  <button id="start-button">推定を開始</button>
  <button id="stop-button">推定を停止</button>
</body>
</html>
```

```javascript:main.js
// 映像を表示するコンテナ要素を取得
const videoContainer = document.getElementById("video-container");

// Estimatorをインスタンス化
const estimator = new NeckAngleEstimator({
  apiBaseUrl: "https://your-api.example.com", // APIのベースURL
  appId: "your-app-id", // アプリケーションID
  container: videoContainer, // (任意) 映像を追記する要素。デフォルトは document.body
  loginOnStart: true, // (任意) start()時にログインを要求するか。デフォルトは false
});

/**
 * イベントリスナーを設定
 * @param {object} result - 推定結果，型定義上はnullを許容しているが推定結果は常に存在する
 *   @param {number} result.id - 推定結果のID
 *   @param {number} result.userId - ユーザーID
 *   @param {string | null} result.fileName - キャプチャされた画像のファイル名
 *   @param {number | null} result.neckAngle - 推定された首の角度（度単位）
 *   @param {number | null} result.sensorAlpha - デバイスの傾きセンサーのアルファ値
 *   @param {number | null} result.sensorBeta - デバイスの傾きセンサーのベータ値
 *   @param {number | null} result.sensorGamma - デバイスの傾きセンサーのガンマ値
 *   @param {number | null} result.facePitch - 顔のピッチ角度（度単位）
 *   @param {number | null} result.faceYaw - 顔のヨー角度（度単位）
 *   @param {number | null} result.faceRoll - 顔のロール角度（度単位）
 *   @param {number | null} result.noseX - 鼻のX座標
 *   @param {number | null} result.noseY - 鼻のY座標
 *   @param {number | null} result.neckX - 首のX座標
 *   @param {number | null} result.neckY - 首のY座標
 *   @param {number | null} result.leftEyeX - 左目のX座標
 *   @param {number | null} result.leftEyeY - 左目のY座標
 *   @param {number | null} result.rightEyeX - 右目のX座標
 *   @param {number | null} result.rightEyeY - 右目のY座標
 *   @param {number | null} result.imageWidth - キャプチャされた画像の幅
 *   @param {number | null} result.imageHeight - キャプチャされた画像の高さ
 *   @param {number | null} result.neckToNose - 首から鼻までの距離（ピクセル単位）
 *   @param {number | null} result.standardDistance - 標準距離（ピクセル単位）
 *   @param {string | null} result.createdAt - 推定結果の作成日時（ISO 8601形式）
 *   @param {string} result.updatedAt - 推定結果の更新日時（ISO 8601形式）
 *   @param {string} result.appId - アプリケーションID
 * @returns {void}
 */
estimator.onEstimate((result) => {
  if (result.neckAngle === null) {
    // キャリブレーションのた中は首の角度が推定されない
    console.log("キャリブレーション中です");
  } else {
    if (result.neckAngle > 60) {
      console.warn("首の角度が大きすぎます:", result.neckAngle);
    } else if (result.neckAngle > 30) {
      console.warn("首の角度が少し大きいです:", result.neckAngle);
    } else if (result.neckAngle > 15) {
      console.log("首の角度は正常です:", result.neckAngle);
    } else {
      console.log("首の角度がとても良いです:", result.neckAngle);
    }
  }
});

/**
 * エラーリスナーを設定
 * @param {Error | ApiError} error - 発生したエラー
 */
estimator.onError((error) => {
  if (data in error) {
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

```

## APIリファレンス

### `new NeckAngleEstimator(options)`

新しい`NeckAngleEstimator`インスタンスを作成します。

**オプション:**

- `apiBaseUrl` (string, 必須): 姿勢推定APIのベースURL。
- `appId` (string, 必須): API用のアプリケーションID。
- `container` (HTMLElement | string, 任意): 映像フィードを追記するHTML要素またはそのID。デフォルトは`document.body`。
- `width` (number, 任意): video要素の幅。デフォルトは`null`（自動）。
- `height` (number, 任意): video要素の高さ。デフォルトは`null`（自動）。
- `interval` (number, 任意): データキャプチャの間隔（ミリ秒）。デフォルトは`500`。
- `calibrationThreshold` (number, 任意): 姿勢のキャリブレーションに使用される閾値（**キャリブレーションはデバイスの角度，デバイスに対するユーザの顔の角度が全てこの閾値以下の場合に発火します**）。デフォルトは`5`。
- `enforceCalibration` (boolean, 任意): `true`の場合、キャリブレーションが完了するまで推定を開始しません。キャリブレーションを行わない場合は、バックエンドが指定したおよその値を使って推定を行います。デフォルトは`false`。
- `hideVideo` (boolean, 任意): `true`の場合、映像フィードを非表示にします。デフォルトは`false`。
- `loginOnInit` (boolean, 任意): `true`の場合、インスタンス化時にユーザーにログインを促します。デフォルトは`false`。
- `loginOnStart` (boolean, 任意): `true`の場合、`start()`呼び出し時にユーザーにログインを促します。デフォルトは`false`。
- `loginCallback` (function, 任意): ログイン成功時に呼び出されるコールバック関数。デフォルトは`null`。
- `loginConfig` (object, 任意): ログイン方法の設定。
  - `basic` (boolean，任意): ベーシック認証を使用するかどうか。デフォルトは`true`。
  - `google` (boolean | object，任意): Google認証を使用するかどうか。デフォルトは`false`。
    - `redirectPath` (string, 任意): Google認証後のリダイレクトパス。デフォルトは`/`。
    - **バックエンドのデプロイ先の関係でクロスオリジンへのCookie書き込みとなり動かない可能性があります**
    - **リダイレクト後許可されていないドメインというエラーが出た場合は管理者にご連絡ください**
    - **googleログインの場合はuser情報を返すのではなくcookie書き込みのみを行なってリダイレクトされる点に注意（ページレンダリング時に`/user/login`のリクエストを送ることを推奨します）**

### メソッド

- `async start(): Promise<void>`: 必要なパーミッション（カメラとデバイス傾き）を要求し、推定プロセスを開始します。
- `stop(): void`: カメラフィード、センサーリスナー、および推定インターバルを停止します。
- `onEstimate(callback: (result: EstimateResult) => void): void`: 推定結果と共に呼び出されるコールバック関数を登録します。
- `onError(callback: (error: Error) => void): void`: エラー発生時に呼び出されるコールバック関数を登録します。
- `isLoggedIn(): boolean`: ユーザーが現在ログインしている場合は`true`を返します。
- `hadCalibrated(): boolean`: ユーザーが基準姿勢をキャリブレーション済みの場合は`true`を返します。
- `sensor.requestPermission(): Promise<void>`: デバイスの傾きセンサーへのアクセス許可を要求します。**ユーザーの明示的なアクションがあった場合に直接呼び出してください。**
- `getUserInfo(): Promise<UserInfo | null>`: 現在のユーザー情報を取得します（`password`や`token`は除く）。ログインしていない場合は`null`を返します。
