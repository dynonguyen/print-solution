import { Table } from '@cads-ui/core';
import { TableColumn } from '@cads-ui/core/components/table/TableProps';

const ProductList = () => {
  const columns: TableColumn[] = [
    { key: 'photo', title: 'Ảnh đại diện' },
    { key: 'uuid', title: 'Mã sản phẩm' },
    { key: 'name', title: 'Tên sản phẩm' },
    { key: 'category', title: 'Danh mục' },
    { key: 'price', title: 'Giá' },
    { key: 'numOfViews', title: 'Lượt xem' },
    { key: 'numOfFavorites', title: 'Lượt thích' },
    { key: 'createdAt', title: 'Ngày tạo' },
    { key: 'updatedAt', title: 'Ngày cập nhật' }
  ];

  return <Table keyField="_id" columns={columns} rows={[]} />;
};

export default ProductList;
