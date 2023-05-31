export const PATH = {
  HOME: '/',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/oop',

  PRODUCT: {
    ROOT: '/product',
    DETAILS: '/product/:productId'
  },

  CUSTOMER: {
    ROOT: '/customer',
    ACCOUNT: '/customer/account'
  },

  GUEST: {
    ROOT: '/guest'
  },

  ORDER: {
    ROOT: '/order',
    CUS_CONTACT: '/order/customer-contact'
  },

  ADMIN: {
    ROOT: '/admin',
    CATEGORY: '/admin/category',
    CHAT: '/admin/chat',
    PRODUCT: {
      ROOT: '/admin/product',
      LIST: '/admin/product/list',
      ADD: '/admin/product/add',
      EDIT_ROOT: '/admin/product/edit',
      EDIT: '/admin/product/edit/:uuid'
    },
    ORDER: '/admin/order',
    REVENUE: '/admin/revenue',
    PROFILE: '/admin/profile',
    SETTINGS: '/admin/settings'
  }
};
