import { getEnv } from '~/utils/getEnv';

export const GATEWAY_URL = getEnv('VITE_APP_GATEWAY_PATH');

export const ENDPOINTS = {
  MINIO_URL: `${GATEWAY_URL}/static/print-solution`,
  MINIO_PUBLIC_URL: `${GATEWAY_URL}/static/print-solution/public`,

  ACCOUNT_API: {
    ROOT: `${GATEWAY_URL}/api/account`
  },
  ORDER_API: {
    ROOT: `${GATEWAY_URL}/api/order`,
    UPLOAD_FILES: '/upload/files'
  },
  PAYMENT_API: {
    ROOT: `${GATEWAY_URL}/api/payment`
  },
  SHIPPING_API: {
    ROOT: `${GATEWAY_URL}/api/shipping`
  },
  DOCS_API: {
    ROOT: `${GATEWAY_URL}/api/docs`,
    DELETE_PHOTO: '/upload/photo',
    UPLOAD_CATEGORY_PHOTO: '/upload/category-photo',
    UPLOAD_PRODUCT_PHOTO: '/upload/product-photo'
  },
  CATALOG_API: {
    ROOT: `${GATEWAY_URL}/api/catalog`
  },
  CHAT_API: {
    ROOT: `${GATEWAY_URL}/api/chat`
  },
  NOTIFICATION_API: {
    ROOT: `${GATEWAY_URL}/api/notification`
  }
};
