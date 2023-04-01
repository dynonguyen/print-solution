import { ENDPOINTS } from '~/constants/endpoints';

export function withMinio(srcPath: string) {
  return `${ENDPOINTS.MINIO_URL}/${srcPath}`;
}

// Ex: example.jpg -> http://localhost:3000/static/print-solution/public/frontend/exmaple.jpg
export function withStatic(srcPath: string) {
  return `${ENDPOINTS.MINIO_PUBLIC_URL}/frontend/${srcPath}`;
}
