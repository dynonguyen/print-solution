import { ORDER_STATUS, PRODUCT_OPTION_TYPES } from '~/constants/common';

const CATEGORY_LIST = [
  {
    id: 1,
    label: 'Danh thiếp',
    description: ''
  },
  {
    id: 2,
    label: 'Bao thư',
    description: ''
  },
  {
    id: 3,
    label: 'Bìa đựng hồ sơ',
    description: ''
  },
  {
    id: 4,
    label: 'Poster - Băng rôn - Standee',
    description: ''
  },
  {
    id: 5,

    label: 'Tờ rơi',
    description: ''
  },
  {
    id: 6,
    label: 'Tờ gấp',
    description: ''
  }
];

const PRODUCT_LIST = [
  {
    id: 1,
    label: 'Danh thiếp',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 2,
    label: 'Bao thư',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 3,
    label: 'Bìa đựng hồ sơ',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 4,
    label: 'Poster - Băng rôn - Standee',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 5,

    label: 'Tờ rơi',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 6,
    label: 'Tờ gấp',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 7,
    label: 'Tờ gấp',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 8,
    label: 'Tờ gấp',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  },
  {
    id: 9,
    label: 'Tờ gấp',
    description: 'Mô tả ở đây',
    image: 'example.jpg'
  }
];

const ORDERS = [
  {
    _id: 'abcde2312345',
    userId: 'thisIsTheUserId',
    address: 'địa chỉ nhận hàng',
    status: ORDER_STATUS.WAITING,
    listProduct: [
      {
        product: {
          uuid: '123cead',
          name: 'tên sản phẩm 1',
          photo: 'public/product/a57fa123af42b3dc32e6f27b29d6250817904228.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['1111']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều ei',
            values: ['aaa', 'bbbb']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '145bcead',
          name: 'tên sản phẩm 2',
          photo: 'image.jpg'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['chọn 1']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều đêyyy',
            values: ['aaa', 'bbbb']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'Ghi chú',
            values: ['Nội dung người dùng nhập']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '245bcd',
          name: 'tên sản phẩm 4',
          photo: 'public/product/a57fa123af42b3dc32e6f27b29d6250817904228.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Cái này chọn nhiều',
            values: ['aaa', 'bbbb', 'cdeef']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'nhập văn bản ở đây',
            values: 'Ghi chú người dùng nhập'
          }
        ],
        amount: 10,
        price: 1000000
      }
    ],
    totalCost: 3000000,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 'abc531fg345',
    userId: 'thisIsTheUserId',
    address: 'địa chỉ nhận hàng',
    status: ORDER_STATUS.WAITING,
    listProduct: [
      {
        product: {
          uuid: '12h3cead',
          name: 'tên sản phẩm 1',
          photo: 'public/product/a57fa123af42b3dc32e6f27b29d6250817904228.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['1111']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều ei',
            values: ['aaa', 'bbbb']
          }
        ],
        amount: 20,
        price: 1500000
      },
      {
        product: {
          uuid: '145bbcead',
          name: 'tên sản phẩm 2',
          photo: 'public/product/a57fa123af42b3dc32e6f27b29d6250817904228.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['chọn 1']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều đêyyy',
            values: ['aaa', 'bbbb']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'Ghi chú',
            values: ['Nội dung người dùng nhập']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '24x5bcd',
          name: 'tên sản phẩm 4',
          photo: 'image.jpg'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Cái này chọn nhiều',
            values: ['aaa', 'bbbb', 'cdeef']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'nhập văn bản ở đây',
            values: 'Ghi chú người dùng nhập'
          }
        ],
        amount: 10,
        price: 1000000
      }
    ],
    totalCost: 3500000,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 'abe23vv5',
    userId: 'thisIsTheUserId',
    address: 'địa chỉ nhận hàng',
    status: ORDER_STATUS.SHIPPING,
    listProduct: [
      {
        product: {
          uuid: '12345cead',
          name: 'tên sản phẩm 1',
          photo: 'public/product/a57fa123af42b3dc32e6f27b29d6250817904228.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['1111']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều ei',
            values: ['aaa', 'bbbb']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '145becead',
          name: 'tên sản phẩm 2',
          photo: 'image.jpg'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['chọn 1']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều đêyyy',
            values: ['aaa', 'bbbb']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'Ghi chú',
            values: ['Nội dung người dùng nhập']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '24bju5bcd',
          name: 'tên sản phẩm 3',
          photo: 'image.jpg'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Cái này chọn nhiều',
            values: ['aaa', 'bbbb', 'cdeef']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'nhập văn bản ở đây',
            values: 'Ghi chú người dùng nhập'
          }
        ],
        amount: 10,
        price: 1000000
      }
    ],
    totalCost: 3000000,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: 'ab9jht12345',
    userId: 'thisIsTheUserId',
    address: 'địa chỉ nhận hàng',
    status: ORDER_STATUS.CANCELED,
    listProduct: [
      {
        product: {
          uuid: '12386cead',
          name: 'tên sản phẩm 1',
          photo: 'image.jpg'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['1111']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều ei',
            values: ['aaa', 'bbbb']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '145bc34ad',
          name: 'tên sản phẩm 2',
          photo: 'img/default-user.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.SINGLE_SELECT,
            label: 'Chọn 1',
            values: ['chọn 1']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Chọn nhiều đêyyy',
            values: ['aaa', 'bbbb']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'Ghi chú',
            values: ['Nội dung người dùng nhập']
          }
        ],
        amount: 10,
        price: 1000000
      },
      {
        product: {
          uuid: '24512bcd',
          name: 'tên sản phẩm 4',
          photo: 'img/default-user.png'
        },
        options: [
          {
            optionType: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT,
            label: 'Cái này chọn nhiều',
            values: ['aaa', 'bbbb', 'cdeef']
          },
          {
            optionType: PRODUCT_OPTION_TYPES.INPUT,
            label: 'nhập văn bản ở đây',
            values: 'Ghi chú người dùng nhập'
          }
        ],
        amount: 10,
        price: 1000000
      }
    ],
    totalCost: 3000000,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export { CATEGORY_LIST, PRODUCT_LIST, ORDERS };
