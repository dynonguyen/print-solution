export function getEnv(key: string = '') {
  return process.env[key];
}

export default getEnv;
