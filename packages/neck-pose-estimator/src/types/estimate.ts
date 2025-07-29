import { OpReturnType } from "openapi-typescript-fetch";
import { paths } from "./api-schema";

export type EstimateResult =
  | OpReturnType<paths["/posture/estimate"]["post"]>
  | OpReturnType<paths["/posture/estimate/guest"]["post"]>;
