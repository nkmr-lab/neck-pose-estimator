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

```bash
npm install neck-pose-estimator
# or
yarn add neck-pose-estimator
# or
pnpm add neck-pose-estimator
```

## 基本的な使い方

`PostureEstimator`の基本的な使用例です。

```typescript
import { PostureEstimator } from "neck-pose-estimator";

// 映像を表示するコンテナ要素を取得
const videoContainer = document.getElementById("video-container");

// Estimatorをインスタンス化
const estimator = new PostureEstimator({
  apiBaseUrl: "https://your-api.example.com", // APIのベースURL
  appId: "your-app-id", // アプリケーションID
  container: videoContainer, // (任意) 映像を追記する要素。デフォルトは document.body
  loginOnStart: true, // (任意) start()時にログインを要求するか。デフォルトは false
});

// イベントリスナーを設定
estimator.onEstimate((result) => {
  console.log("姿勢が推定されました:", result);
});

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

startEstimation();

// 推定を停止する場合
// estimator.stop();
```

## APIリファレンス

### `new PostureEstimator(options)`

新しい`PostureEstimator`インスタンスを作成します。

**オプション:**

- `apiBaseUrl` (string, 必須): 姿勢推定APIのベースURL。
- `appId` (string, 必須): API用のアプリケーションID。
- `container` (HTMLElement | string, 任意): 映像フィードを追記するHTML要素またはそのID。デフォルトは`document.body`。
- `width` (number, 任意): video要素の幅。デフォルトは`null`（自動）。
- `height` (number, 任意): video要素の高さ。デフォルトは`null`（自動）。
- `interval` (number, 任意): データキャプチャの間隔（ミリ秒）。デフォルトは`500`。
- `loginOnInit` (boolean, 任意): `true`の場合、インスタンス化時にユーザーにログインを促します。デフォルトは`false`。
- `loginOnStart` (boolean, 任意): `true`の場合、`start()`呼び出し時にユーザーにログインを促します。デフォルトは`false`。
- `calibrationThreshold` (number, 任意): 姿勢のキャリブレーションに使用される閾値（**キャリブレーションはデバイスの角度，デバイスに対するユーザの顔の角度が全てこの閾値以下の場合に発火します**）。デフォルトは`5`。
- `enforceCalibration` (boolean, 任意): `true`の場合、キャリブレーションが完了するまで推定を開始しません。キャリブレーションを行わない場合は、バックエンドが指定したおよその値を使って推定を行います。デフォルトは`false`。
- `hideVideo` (boolean, 任意): `true`の場合、映像フィードを非表示にします。デフォルトは`false`。
- `loginConfig` (object, 任意): ログイン方法の設定。
  - `basic` (boolean，任意): ベーシック認証を使用するかどうか。デフォルトは`true`。
  - `google` (boolean | object，任意): Google認証を使用するかどうか。デフォルトは`false`。
    - `redirectPath` (string, 任意): Google認証後のリダイレクトパス。デフォルトは`/`。
    - **バックエンドのデプロイ先の関係でクロスオリジンへのCookie書き込みとなり動かない可能性があります**
    - **リダイレクト後許可されていないドメインというエラーが出た場合は管理者にご連絡ください**
    - **googleログインの場合はuser情報を返すのではなくcookie書き込みのみを行なってリダイレクトされる点に注意**

### メソッド

- `async start(): Promise<void>`: 必要なパーミッション（カメラとデバイス傾き）を要求し、推定プロセスを開始します。
- `stop(): void`: カメラフィード、センサーリスナー、および推定インターバルを停止します。
- `onEstimate(callback: (result: EstimateResult) => void): void`: 推定結果と共に呼び出されるコールバック関数を登録します。
- `onError(callback: (error: Error) => void): void`: エラー発生時に呼び出されるコールバック関数を登録します。
- `isLoggedIn(): boolean`: ユーザーが現在ログインしている場合は`true`を返します。
- `hadCalibrated(): boolean`: ユーザーが基準姿勢をキャリブレーション済みの場合は`true`を返します。
- `sensor.requestPermission(): Promise<void>`: デバイスの傾きセンサーへのアクセス許可を要求します。ユーザーの明示的なアクションが必要です。
- `getUserInfo(): Promise<UserInfo | null>`: 現在のユーザー情報を取得します（`password`や`token`は除く）。ログインしていない場合は`null`を返します。
