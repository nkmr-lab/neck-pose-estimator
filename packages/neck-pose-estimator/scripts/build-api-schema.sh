#!/usr/bin/env bash
set -e

# 環境変数読み込み
API_URL="${API_URL:-https://api.example.com}"
OPENAPI_PATH="${OPENAPI_PATH:-/openapi.json}"
FULL_URL="${API_URL}${OPENAPI_PATH}"

echo "Fetching OpenAPI schema from: $FULL_URL"

# 型定義を生成する場合 (openapi-typescript)
pnpx openapi-typescript "$FULL_URL" -o src/types/api-schema.ts

# クライアントを生成したい場合 (openapi-generator)
# npx @openapitools/openapi-generator-cli generate \
#   -i "$FULL_URL" \
#   -g typescript-axios \
#   -o src/api-client

echo "OpenAPI build complete!"