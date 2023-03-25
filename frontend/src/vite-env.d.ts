/// <reference types="vite/client" />

export interface ImportMetaEnv {
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_APP_GATEWAY_PATH: string;
  VITE_APP_KEYCLOAK_URL: string;
  VITE_APP_KEYCLOAK_REALM: string;
  VITE_APP_KEYCLOAK_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
