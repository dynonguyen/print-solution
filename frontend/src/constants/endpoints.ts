import { getEnv } from '~/utils/getEnv';

export const GATEWAY_URL = getEnv('VITE_APP_GATEWAY_PATH');

export const ENDPOINTS = {
  STATIC_URL: `${GATEWAY_URL}/static`,
  PUBLIC_URL: `${GATEWAY_URL}/static/public`,
  ACCOUNT_API: `${GATEWAY_URL}/api/account`,
  DOCS_API: `${GATEWAY_URL}/api/docs`,
  ORDER_API: `${GATEWAY_URL}/api/order`,
  PAYMENT_API: `${GATEWAY_URL}/api/payment`,
  SHIPPING_API: `${GATEWAY_URL}/api/shipping`,
  CATALOG_API: `${GATEWAY_URL}/api/catalog`,
  CHAT_API: `${GATEWAY_URL}/api/chat`,
  NOTIFICATION_API: `${GATEWAY_URL}/api/notification`
};
