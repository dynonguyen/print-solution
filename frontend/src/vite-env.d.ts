/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_APP_GATEWAY_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
