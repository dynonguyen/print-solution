import { ENDPOINTS } from '~/constants/endpoints';

// Ex: example.jpg -> http://localhost:3000/static/exmaple.jpg
export function withStatic(srcPath: string) {
  return `${ENDPOINTS.STATIC_URL}/${srcPath}`;
}

// Ex: example.jpg -> http://localhost:3000/static/exmaple.jpg
export function withPublic(srcPath: string) {
  return `${ENDPOINTS.PUBLIC_URL}/${srcPath}`;
}
