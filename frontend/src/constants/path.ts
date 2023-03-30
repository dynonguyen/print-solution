export const PATH = {
  HOME: '/',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/oop',

  ACCOUNT: {
    ROOT: '/account',
    PROFILE: '/account/profile'
  },

  ADMIN: {
    ROOT: '/admin',
    CATEGORY: '/admin/category',
    PRODUCT: {
      ROOT: '/admin/product',
      LIST: '/admin/product',
      DETAILS: '/admin/product/:productId'
    },
    ORDER: '/admin/order',
    REVENUE: '/admin/revenue',
    PROFILE: '/admin/profile',
    SETTINGS: '/admin/settings'
  }
};
