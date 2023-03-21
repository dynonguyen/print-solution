import { ImportMetaEnv } from '~/vite-env';

export function getEnv(key: keyof ImportMetaEnv) {
  return import.meta.env[key];
}
