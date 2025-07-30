export interface paths {
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Hello World */
    get: operations["hello_world__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Users */
    get: operations["get_users_user__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/auth/email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Login Or Create By Email */
    post: operations["login_or_create_by_email_user_auth_email_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/auth/basic": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Login Or Create Basic */
    post: operations["login_or_create_basic_user_auth_basic_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Login */
    get: operations["login_user_login_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/login/basic": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Login By Basic */
    get: operations["login_by_basic_user_login_basic_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/login/email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Login By Email */
    get: operations["login_by_email_user_login_email_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/me/basic": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Is Exist By Basic */
    get: operations["is_exist_by_basic_user_me_basic_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/me/email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Is Exist By Email */
    get: operations["is_exist_by_email_user_me_email_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/create/basic": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create User Basic */
    post: operations["create_user_basic_user_create_basic_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/create/email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create User By Email */
    post: operations["create_user_by_email_user_create_email_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/login/google": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Login Google */
    get: operations["login_google_user_login_google_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/login/google/callback": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Google Callback */
    get: operations["google_callback_user_login_google_callback_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Logout */
    post: operations["logout_user_logout_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/calibrate": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** Calibrate User */
    put: operations["calibrate_user_user_calibrate_put"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** Update User */
    put: operations["update_user_user_update_put"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Postures */
    get: operations["get_postures_posture__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/{posture_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Posture By Id */
    get: operations["get_posture_by_id_posture__posture_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/user": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Posture By User Id */
    get: operations["get_posture_by_user_id_posture_user_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/user/admin": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Posture By User Id */
    get: operations["get_posture_by_user_id_posture_user_admin_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create Posture */
    post: operations["create_posture_posture_create_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/estimate": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Estimate Posture */
    post: operations["estimate_posture_posture_estimate_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/estimate/guest": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Estimate Posture */
    post: operations["estimate_posture_posture_estimate_guest_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/estimate/feature": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Estimate Feature */
    post: operations["estimate_feature_posture_estimate_feature_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/filename": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** Update Filename */
    put: operations["update_filename_posture_filename_put"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/sensor": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** Update Sensor */
    put: operations["update_sensor_posture_sensor_put"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/face": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** Update Face */
    put: operations["update_face_posture_face_put"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/position": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /** Update Position */
    put: operations["update_position_posture_position_put"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/app": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get My Postures By App Id */
    get: operations["get_my_postures_by_app_id_posture_app_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/app/admin/{user_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User Postures By App Id */
    get: operations["get_user_postures_by_app_id_posture_app_admin__user_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/app/stats/admin/{user_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User Posture Stats By App Id */
    get: operations["get_user_posture_stats_by_app_id_posture_app_stats_admin__user_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/app/stats": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get My Posture Stats By App Id */
    get: operations["get_my_posture_stats_by_app_id_posture_app_stats_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/posture/app/ranking": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Posture Ranking */
    get: operations["get_posture_ranking_posture_app_ranking_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/project/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Project By App Id */
    get: operations["get_project_by_app_id_project__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/project/list": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Project By Owner User Token */
    get: operations["get_project_by_owner_user_token_project_list_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/project/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create Project */
    post: operations["create_project_project_create_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** Body_estimate_feature_posture_estimate_feature_post */
    Body_estimate_feature_posture_estimate_feature_post: {
      /**
       * File
       * Format: binary
       */
      file: Blob;
      /** Sensors */
      sensors: string;
    };
    /** Body_estimate_posture_posture_estimate_guest_post */
    Body_estimate_posture_posture_estimate_guest_post: {
      /**
       * File
       * Format: binary
       */
      file: Blob;
      /** Sensors */
      sensors: string;
    };
    /** Body_estimate_posture_posture_estimate_post */
    Body_estimate_posture_posture_estimate_post: {
      /**
       * File
       * Format: binary
       */
      file: Blob;
      /** Sensors */
      sensors: string;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** Posture */
    Posture: {
      /** Id */
      id: number;
      /** Userid */
      userId: number;
      /** Filename */
      fileName: string | null;
      /** Neckangle */
      neckAngle: number | null;
      /** Sensoralpha */
      sensorAlpha: number | null;
      /** Sensorbeta */
      sensorBeta: number | null;
      /** Sensorgamma */
      sensorGamma: number | null;
      /** Facepitch */
      facePitch: number | null;
      /** Faceyaw */
      faceYaw: number | null;
      /** Faceroll */
      faceRoll: number | null;
      /** Nosex */
      noseX: number | null;
      /** Nosey */
      noseY: number | null;
      /** Neckx */
      neckX: number | null;
      /** Necky */
      neckY: number | null;
      /** Imagewidth */
      imageWidth: number | null;
      /** Imageheight */
      imageHeight: number | null;
      /** Necktonose */
      neckToNose: number | null;
      /** Standarddistance */
      standardDistance: number | null;
      /** Createdat */
      createdAt: string | null;
      /** Updatedat */
      updatedAt: string;
      /** Appid */
      appId: string;
    };
    /** PostureCreate */
    PostureCreate: {
      /** Userid */
      userId: number;
      /** Filename */
      fileName: string | null;
      /** Neckangle */
      neckAngle: number | null;
      /** Sensoralpha */
      sensorAlpha: number | null;
      /** Sensorbeta */
      sensorBeta: number | null;
      /** Sensorgamma */
      sensorGamma: number | null;
      /** Facepitch */
      facePitch: number | null;
      /** Faceyaw */
      faceYaw: number | null;
      /** Faceroll */
      faceRoll: number | null;
      /** Nosex */
      noseX: number | null;
      /** Nosey */
      noseY: number | null;
      /** Neckx */
      neckX: number | null;
      /** Necky */
      neckY: number | null;
      /** Imagewidth */
      imageWidth?: number | null;
      /** Imageheight */
      imageHeight?: number | null;
      /** Necktonose */
      neckToNose: number | null;
      /** Standarddistance */
      standardDistance: number | null;
      /** Createdat */
      createdAt: string;
      /** Appid */
      appId: string;
    };
    /** PostureOnlyFace */
    PostureOnlyFace: {
      /** Pitch */
      pitch: number | null;
      /** Yaw */
      yaw: number | null;
      /** Roll */
      roll: number | null;
    };
    /** PostureOnlyFilename */
    PostureOnlyFilename: {
      /** Id */
      id: number | null;
      /** Filename */
      fileName: string;
    };
    /** PostureOnlyPosition */
    PostureOnlyPosition: {
      /** Nosex */
      noseX: number | null;
      /** Nosey */
      noseY: number | null;
      /** Neckx */
      neckX: number | null;
      /** Necky */
      neckY: number | null;
      /** Imagewidth */
      imageWidth?: number | null;
      /** Imageheight */
      imageHeight?: number | null;
      /** Necktonose */
      neckToNose: number | null;
      /** Standarddist */
      standardDist: number | null;
    };
    /** PostureOnlySensor */
    PostureOnlySensor: {
      /** Alpha */
      alpha: number | null;
      /** Beta */
      beta: number | null;
      /** Gamma */
      gamma: number | null;
    };
    /** PostureRankingItem */
    PostureRankingItem: {
      /** Count */
      count: number;
      /** Neckangleavg */
      neckAngleAvg: number | null;
      /** Neckanglestd */
      neckAngleStd: number | null;
      /** Goodposturerate */
      goodPostureRate: number | null;
      /** Username */
      userName: string;
      /** Rank */
      rank: number;
    };
    /** PostureStats */
    PostureStats: {
      /** Count */
      count: number;
      /** Neckangleavg */
      neckAngleAvg: number | null;
      /** Neckanglestd */
      neckAngleStd: number | null;
      /** Goodposturerate */
      goodPostureRate: number | null;
    };
    /** Project */
    Project: {
      /** Id */
      id: number;
      /** Appid */
      appId: string;
      /** Name */
      name: string;
      /** Ownerusertoken */
      ownerUserToken: string;
      /**
       * Createdat
       * Format: date-time
       */
      createdAt: string;
      /**
       * Updatedat
       * Format: date-time
       */
      updatedAt: string;
    };
    /** ProjectCreate */
    ProjectCreate: {
      /** Ownerusertoken */
      ownerUserToken: string;
      /** Name */
      name: string;
    };
    /** ResponseEx */
    ResponseEx: {
      /** Status */
      status: boolean;
      /** Message */
      message: string;
      /**
       * Timestamp
       * Format: date-time
       */
      timestamp: string;
    };
    /** User */
    User: {
      /** Id */
      id: number;
      /**
       * Name
       * @default
       */
      name: string;
      /**
       * Password
       * @default
       */
      password: string;
      /** Email */
      email: string | null;
      /** Token */
      token: string;
      /**
       * Isadmin
       * @default false
       */
      isAdmin: boolean;
      /** Standardpostureid */
      standardPostureId: number | null;
      /**
       * Createdat
       * Format: date-time
       */
      createdAt: string;
    };
    /** UserCalibrate */
    UserCalibrate: {
      /** Standardpostureid */
      standardPostureId: number;
    };
    /** UserCreateBasic */
    UserCreateBasic: {
      /** Name */
      name: string;
      /** Password */
      password: string;
      /**
       * Isadmin
       * @default false
       */
      isAdmin: boolean;
    };
    /** UserCreateEmail */
    UserCreateEmail: {
      /** Email */
      email: string;
      /** Name */
      name: string;
      /**
       * Isadmin
       * @default false
       */
      isAdmin: boolean;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  hello_world__get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ResponseEx"];
        };
      };
    };
  };
  get_users_user__get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"][];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
    };
  };
  login_or_create_by_email_user_auth_email_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreateEmail"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  login_or_create_basic_user_auth_basic_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreateBasic"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  login_user_login_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"] | null;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
    };
  };
  login_by_basic_user_login_basic_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"] | null;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
    };
  };
  login_by_email_user_login_email_get: {
    parameters: {
      query: {
        email: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"] | null;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  is_exist_by_basic_user_me_basic_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": boolean;
        };
      };
    };
  };
  is_exist_by_email_user_me_email_get: {
    parameters: {
      query: {
        email: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": boolean;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_user_basic_user_create_basic_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreateBasic"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_user_by_email_user_create_email_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreateEmail"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  login_google_user_login_google_get: {
    parameters: {
      query?: {
        redirect_to?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      302: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  google_callback_user_login_google_callback_get: {
    parameters: {
      query: {
        code: string;
        state: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      302: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  logout_user_logout_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": boolean;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Token Expired" */
      498: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Token Expired"
           *     } */
          "application/json": unknown;
        };
      };
    };
  };
  calibrate_user_user_calibrate_put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCalibrate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_user_user_update_put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_postures_posture__get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"][];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
    };
  };
  get_posture_by_id_posture__posture_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        posture_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_posture_by_user_id_posture_user_get: {
    parameters: {
      query: {
        user_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"][];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_posture_by_user_id_posture_user_admin_get: {
    parameters: {
      query: {
        user_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"][];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_posture_posture_create_post: {
    parameters: {
      query?: never;
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostureCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  estimate_posture_posture_estimate_post: {
    parameters: {
      query?: never;
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_estimate_posture_posture_estimate_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  estimate_posture_posture_estimate_guest_post: {
    parameters: {
      query?: never;
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_estimate_posture_posture_estimate_guest_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  estimate_feature_posture_estimate_feature_post: {
    parameters: {
      query?: never;
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_estimate_feature_posture_estimate_feature_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_filename_posture_filename_put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostureOnlyFilename"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_sensor_posture_sensor_put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostureOnlySensor"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_face_posture_face_put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostureOnlyFace"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_position_posture_position_put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostureOnlyPosition"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"];
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_my_postures_by_app_id_posture_app_get: {
    parameters: {
      query: {
        start_time: string;
        end_time?: string;
      };
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"][];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_user_postures_by_app_id_posture_app_admin__user_id__get: {
    parameters: {
      query?: never;
      header?: {
        "app-id"?: string;
      };
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Posture"][];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_user_posture_stats_by_app_id_posture_app_stats_admin__user_id__get: {
    parameters: {
      query?: {
        threshold?: number;
      };
      header?: {
        "app-id"?: string;
      };
      path: {
        user_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PostureStats"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Forbidden" */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Forbidden"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_my_posture_stats_by_app_id_posture_app_stats_get: {
    parameters: {
      query?: {
        start_time?: string;
        end_time?: string;
        threshold?: number;
      };
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PostureStats"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_posture_ranking_posture_app_ranking_get: {
    parameters: {
      query?: {
        limit?: number;
        threshold?: number;
        start_time?: string;
        end_time?: string;
      };
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PostureRankingItem"][];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Unauthorized" */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Unauthorized"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_project_by_app_id_project__get: {
    parameters: {
      query?: never;
      header?: {
        "app-id"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Project"];
        };
      };
      /** @description "Bad Request" */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Bad Request"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description "Not Found" */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "detail": "Not Found"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_project_by_owner_user_token_project_list_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Project"][];
        };
      };
    };
  };
  create_project_project_create_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProjectCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Project"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
