export const PATH = {
  HOME: '/',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/oop',

  PRODUCT: {
    ROOT: '/product',
    DETAILS: '/product/:productId',
    SEARCH: '/product/search',
  },

  CUSTOMER: {
    ROOT: '/customer',
    ACCOUNT: '/customer/account'
  },

  GUEST: {
    ROOT: '/guest',
    CART: '/shoping_cart'
  },

  ORDER: {
    ROOT: '/order',
    CUS_CONTACT: '/order/customer-contact',
    DETAILS: '/order/details',
    // DETAILS: 'order/details',
    SUCCESS: '/order/success'
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
    ORDER: {
      ROOT: '/admin/order',
      LIST: '/admin/order/list',
      // EDIT: '/admin/product/edit/:uuid'
    },
    REVENUE: '/admin/revenue',
    PROFILE: '/admin/profile',
    SETTINGS: '/admin/settings'
  }
};
