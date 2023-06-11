import { SelectOption } from '@cads-ui/core/components/select/SelectProps';
import { TableTranslation } from '@cads-ui/core/components/table/TableProps';

export const COMMONS = {
  APP_NAME: 'Print Solution',
  SLOGAN: 'Giải pháp quản lý đặt in ấn hiệu quả, tiết kiệm'
};

export const USER_ROLES = { ADMIN: 'admin', CUSTOMER: 'customer', GUEST: 'guest' };

export const CONTACT_PRICE = 0;

export const PRODUCT_OPTION_TYPES = {
  SINGLE_SELECT: 'select',
  MULTIPLE_SELECT: 'mul_select',
  INPUT: 'input'
};

export const PRODUCT_OPTION_TYPES_OPTIONS: SelectOption[] = [
  { label: 'Khách hàng có thể chọn 1 tùy chọn', value: PRODUCT_OPTION_TYPES.SINGLE_SELECT },
  { label: 'Khách hàng có thể chọn nhiều tùy chọn', value: PRODUCT_OPTION_TYPES.MULTIPLE_SELECT },
  { label: 'Khách hàng nhập yêu cầu', value: PRODUCT_OPTION_TYPES.INPUT }
];

export const TABLE_SORT_TYPE = {
  ASC: 'ascend',
  DESC: 'descend'
};

export const TABLE_TRANSLATION: TableTranslation = {
  descending: 'Giảm dần',
  ascending: 'Tăng dần',
  sort: 'Sắp xếp',
  search: 'Tìm kiếm',
  colFilter: 'Ẩn cột'
};

export const ORDER_STATUS: Record<string, { id: string; name: string }> = {
  WAITING_CONFIRM: { id: "WAITING_CONFIRM", name: 'Chờ xử lý' },
  CONFIRMED: { id: "CONFIRMED", name: 'Đã xác nhận' },
  WAITING_PAYMENT: { id: "WAITING_PAYMENT", name: 'Chờ thanh toán' },
  PRINTING: { id: "PRINTING", name: 'Đang in' },
  SHIPPING: { id: "SHIPPING", name: 'Đang giao' },
  COMPLETED: { id: "COMPLETED", name: 'Đã hoàn thành' },
  REJECT: { id: "REJECT", name: 'Lỗi' },
  CANCELED: { id: "CANCELED", name: 'Đã hủy' },
};


