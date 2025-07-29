// src/api/script/generate-api-types.ts
import fs from "node:fs";
import path from "node:path";

import openapiTS, { astToString } from "openapi-typescript";
import { factory } from "typescript";

const BLOB = factory.createTypeReferenceNode(factory.createIdentifier("Blob"));

async function generateTypes() {
  if (!process.env.API_URL) {
    throw new Error("API_URL environment variable is not set.");
  }
  const url = `${process.env.API_URL}/${
    process.env.OPENAPI_PATH ?? "openapi.json"
  }`;
  const ast = await openapiTS(
    // OpenAPI スキーマファイルのパスを指定
    new URL(url),
    {
      transform(schemaObject) {
        // binary format の場合、Blob型に変換
        if (schemaObject.format === "binary") {
          return BLOB;
        }
      },
    },
  );

  const contents = astToString(ast);

  // 生成したい場所にファイルを出力
  fs.writeFileSync(
    path.resolve(process.cwd(), "./src/types/api-schema.ts"),
    contents,
  );
}

generateTypes();
