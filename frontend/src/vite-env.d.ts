/// <reference types="vite/client" />

export interface ImportMetaEnv {
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_APP_GATEWAY_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
