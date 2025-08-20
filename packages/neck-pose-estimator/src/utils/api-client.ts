import { paths } from "../types";
import {
  ApiError,
  Fetcher,
  type OpArgType,
  type OpReturnType,
} from "openapi-typescript-fetch";

export const apiClient = Fetcher.for<paths>();
export { ApiError } from "openapi-typescript-fetch";

type OperationParameters<T> = T extends { parameters: infer P } ? P : never;

const buildUrl = (
  path: string,
  params?: {
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
  },
): string => {
  let url = path;

  if (params?.path) {
    for (const [key, value] of Object.entries(params.path)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
  }

  if (params?.query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params.query)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
};

export const useApiClient = async <
  Path extends keyof paths,
  Method extends keyof paths[Path],
>(
  apiBaseUrl: string,
  appId: string,
  [path, method]: [Path, Method],
  argsResolver: () => OpArgType<paths[Path][Method]> | null,
  options?: HeadersInit,
  params?: OperationParameters<paths[Path][Method]>,
) => {
  const args = argsResolver?.();
  const isFormData = args instanceof FormData;
  apiClient.configure({
    baseUrl: apiBaseUrl,
    init: {
      headers: {
        "App-Id": appId,
        "Access-Control-Allow-Credentials": "true",
        ...(options ?? {}),
      },
      credentials: "include",
      mode: "cors",
    },
  });

  // NOTE: openapi-typescript-fetchがすべてのリクエストに対してJSON.stringify()やContent-Type: application/jsonを追加するため、
  // FormDataを使用する場合は、fetch()を直接使用する
  if (isFormData) {
    const url = buildUrl(path as string, params as any);
    return fetch(`${apiBaseUrl}${url}`, {
      method: typeof method === "string" ? method.toUpperCase() : "POST",
      body: args,
      headers: {
        "App-Id": appId,
        "Access-Control-Allow-Credentials": "true",
        ...(options ?? {}),
      },
      credentials: "include",
    })
      .then(
        (res) =>
          res.json() as Promise<OpReturnType<paths[Path][Method]> | ApiError>,
      )
      .catch((err) => {
        if (err instanceof ApiError) {
          console.error(
            `API request failed: ${err.status} ${err.data?.detail}`,
          );
          return err as ApiError;
        }
        console.error("API request failed", err);
        return err as Error;
      });
  }
  return (
    apiClient
      .path(path)
      .method(method)
      // @ts-expect-error - 型が合わないが、実際には問題ない（はず）
      .create()(args ? args : {}, {})
      .then((res) => res.data as OpReturnType<paths[Path][Method]>)
      .catch((err) => {
        if (err instanceof ApiError) {
          console.error(`API request failed: ${err.message}`);
          return err as ApiError;
        } else {
          console.error("API request failed with unknown error");
          return err as Error;
        }
      })
  );
};
