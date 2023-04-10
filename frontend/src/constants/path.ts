export const PATH = {
  HOME: '/',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/oop',

  CUSTOMER: {
    ROOT: '/customer',
    ACCOUNT: '/customer/account',
    PRODUCT: {
      ROOT: '/customer/product',
      LIST: '/customer/product',
      DETAILS: '/customer/product/:productId'
    }
  },

  GUEST: {
    ROOT: '/guest',
    PRODUCT: {
      ROOT: '/guest/product',
      LIST: '/guest/product',
      DETAILS: '/guest/product/:productId'
    }
  },

  ADMIN: {
    ROOT: '/admin',
    CATEGORY: '/admin/category',
    CHAT: '/admin/chat',
    PRODUCT: {
      ROOT: '/admin/product',
      LIST: '/admin/product/list',
      ADD: '/admin/product/add'
    },
    ORDER: '/admin/order',
    REVENUE: '/admin/revenue',
    PROFILE: '/admin/profile',
    SETTINGS: '/admin/settings'
  }
};
