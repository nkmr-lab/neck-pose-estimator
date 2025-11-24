# 首姿勢推定ライブラリ - サンプル (neck-pose-estimator - Examples)

このディレクトリには、`neck-pose-estimator`ライブラリの使用方法を示すサンプルアプリケーションが含まれています。

## 含まれるサンプル

- **`neck-pose-estimator-example-react`**: React と Vite で構築されたサンプルアプリケーションです。ライブラリを統合し、ビデオフィードと推定結果を表示する基本的な方法を示します。
- **`neck-pose-estimator-example-vanilla`**: vanilla JavaScript で構築されたサンプルアプリケーションです。ライブラリを統合し、ビデオフィードと推定結果を表示する基本的な方法を示します。

## サンプルの実行方法

まずは環境変数をセットします。
`.env.local`ファイルを作成し、以下の内容を追加します。

```env
VITE_API_BASE_URL=https://your-api.example.com
VITE_APP_ID=your-app-id
```

`VITE_API_BASE_URL`には、姿勢推定 API のベース URL を設定します。`VITE_APP_ID`には、アプリケーション ID を設定します。

**注意:** このアプリケーションがカメラとデバイスの傾きセンサーにアクセスするには、**HTTPS**コンテキストが必要です。Vite 開発サーバーは、自己署名証明書を提供することで HTTPS で実行するように設定できます。

自己証明書を作成するには、まず`mkcert`をインストールしてください。
macOS では Homebrew を使用してインストールできます。

```bash
brew install mkcert
```

windows では winget を使用してインストールできます。

```powershell
winget install mkcert
```

次に、自己認証局，ルート証明書などを生成します。

```bash
mkcert --install
mkcert -CAROOT
```

次に，localhost に対して自己署名証明書を生成します。

```bash
mkcert localhost
```

このコマンドにより、`localhost.pem`と`localhost-key.pem`という 2 つのファイルが生成されます。
これらのファイルを[certs](./certs)ディレクトリに移動します。
`vite.config.ts`の`server.https`オプションでこれらのファイルを参照することで，HTTPS での開発サーバーを起動できます。

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { join } from "path";
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: readFileSync(join(__dirname, "../certs", "localhost-key.pem")),
      cert: readFileSync(join(__dirname, "../certs", "localhost.pem")),
    },
    host: "0.0.0.0",
  },
});
```

サンプルを実行するには、モノレポのルートディレクトリに移動し、次のコマンドを実行します。

```bash
pnpm -F neck-pose-estimator-example-react dev
```
