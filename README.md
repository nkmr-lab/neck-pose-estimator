# Neck Pose Estimator

このリポジトリは、`pnpm`ワークスペースで管理されている、首の姿勢推定ライブラリとそのサンプルアプリケーションのモノレポです。

このプロジェクトは、カメラとデバイスのセンサーを使用して首の姿勢を推定するコアライブラリ（TypeScript 製）と、その使用法を示す React ベースのサンプルアプリケーションで構成されています。

## ワークスペース構成

- `packages/neck-pose-estimator`: コアライブラリ。npm への公開を想定しています。バックエンド API に接続し、首の角度を推定する`PostureEstimator`クラスを提供します。
  - ライブラリの使い方や詳細は [README](packages/neck-pose-estimator/README.md) を参照してください。
- `packages/neck-pose-estimator-example`: `neck-pose-estimator`ライブラリを使用したサンプルアプリケーションが含まれています。
  - `neck-pose-estimator-example-react`: Vite で構築された React アプリケーションです。

## 技術スタック

- **pnpm Workspaces**: モノレポの管理
- **TypeScript**: プロジェクト全体での型安全性
- **React**: サンプルアプリケーションの UI
- **Vite**: サンプルアプリケーションの高速な開発体験
- **Vitest**: コアライブラリの単体テストおよび結合テスト

## 開発の始め方

### 前提条件

- [Node.js](https://nodejs.org/) (v18 以降)
- [pnpm](https://pnpm.io/)

### セットアップ

リポジトリをクローンし、ルートディレクトリから依存関係をインストールします。

```bash
# リポジトリをクローン
git clone <repository-url>
cd neck-pose-estimator

# すべてのパッケージの依存関係をインストール
pnpm install
```

### ビルド

ワークスペース内のすべてのパッケージをビルドするには、ルートディレクトリから次のコマンドを実行します。

```bash
pnpm -r build
```

### サンプルアプリケーションの実行

React サンプルアプリケーションを開発モードで実行するには、次のコマンドを使用します。

```bash
pnpm -F @nkmr-lab/neck-pose-estimator-example-react dev
```

これにより Vite 開発サーバーが起動します。アプリケーションがカメラとデバイスセンサーにアクセスするには、HTTPS コンテキストが必要であることに注意してください。また、環境変数や自己証明書など詳細なセットアップは、`neck-pose-estimator-example`の [README](packages/neck-pose-estimator-example/README.md) を参照してください。

### テストの実行

コアライブラリのテストスイートを実行するには、次のコマンドを使用します。

```bash
pnpm -F @nkmr-lab/neck-pose-estimator test
```

### バックエンドの API スキーマの更新

バックエンドの API スキーマが更新された場合、`packages/neck-pose-estimator/src/types/api-schema.ts`を更新する必要があります。
以下のコマンドを実行して、最新のスキーマを取得できます。（`.env`ファイルにバックエンドの OpenAPI スキーマを配信している URL を設定する必要があります）

```bash
pnpm -F @nkmr-lab/neck-pose-estimator openapi
```
