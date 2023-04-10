import { Avatar, Button, Flex, Table, Tooltip, Typography } from '@cads-ui/core';
import { OnFilterValue, TableColumn } from '@cads-ui/core/components/table/TableProps';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '~/components/Icon';
import { CONTACT_PRICE, TABLE_SORT_TYPE, TABLE_TRANSLATION } from '~/constants/common';
import { DEFAULTS } from '~/constants/default';
import { PATH } from '~/constants/path';
import { useAdminProductListQuery } from '~/graphql/catalog/generated/graphql';
import useQueryPagination, { SetQueryParams } from '~/hooks/useQueryPagination';
import { getTableSortByQuery, toVND } from '~/utils/helper';
import { withMinio } from '~/utils/withStatic';

const ProductList = () => {
  const {
    page,
    pageSize,
    search,
    sort = '',
    searchBy,
    setParams,
    deleteParams
  } = useQueryPagination({
    defaultValues: { pageSize: DEFAULTS.TABLE_PAGE_SIZE, sort: '-createdAt name' }
  });
  const { loading, data } = useAdminProductListQuery({ variables: { page, pageSize, sort, search, searchBy } });
  const { docs: products = [], total = 1 } = data?.products || {};

  const columns: TableColumn[] = [
    {
      key: 'photo',
      title: 'Hình ảnh',
      render: (src) => <Avatar src={withMinio(src)} alt={src} shape="square" sx={{ w: 50, h: 50 }} />,
      renderTdProps: () => ({ style: { minWidth: 100 } })
    },
    { key: 'uuid', title: 'Mã sản phẩm', renderTdProps: () => ({ style: { minWidth: 130 } }) },
    { key: 'name', title: 'Tên sản phẩm', maxWidth: 200, sorter: getTableSortByQuery(sort, 'name') },
    { key: 'category', title: 'Danh mục', maxWidth: 150, sorter: getTableSortByQuery(sort, 'category') },
    {
      key: 'price',
      title: 'Giá',
      render: (price) => (price === CONTACT_PRICE ? 'Liên hệ' : toVND(price)),
      sorter: getTableSortByQuery(sort, 'price')
    },
    { key: 'unit', title: 'Đơn vị', maxWidth: 80 },
    {
      key: 'createdAt',
      title: 'Ngày tạo',
      render: (createdAt) => moment(createdAt).format('HH:mm DD/MM/YYYY'),
      maxWidth: 150,
      sorter: getTableSortByQuery(sort, 'createdAt')
    },
    {
      key: '_action',
      title: 'Action',
      align: 'right',
      render: (_, { isHidden, uuid }) => (
        <Flex justifyContent="flex-end">
          <Tooltip title="Chỉnh sửa" placement="left">
            <Link to={`${PATH.ADMIN.PRODUCT.EDIT_ROOT}/${uuid}`}>
              <Button isIconBtn>
                <Icon icon="material-symbols:edit" />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Ẩn sản phẩm" placement="left">
            <Button isIconBtn color="error">
              <Icon icon={!isHidden ? 'mdi:eye' : 'mdi:eye-off'} />
            </Button>
          </Tooltip>
        </Flex>
      )
    }
  ];

  const rows = products.map((product) => {
    const { category, __typename, _id, ...other } = product;
    return { category: category?.name || '', ...other };
  });

  const handleFilterChange = (filter: OnFilterValue) => {
    const queryParams: SetQueryParams = [];
    const deleted: string[] = [];

    if (filter.sorting.length) {
      queryParams.push({
        key: 'sort',
        value: filter.sorting
          .sort((a, b) => (a.multiple || 0) - (b.multiple || 0))
          .map((s) => `${s.type === TABLE_SORT_TYPE.DESC ? '-' : ''}${s.key}`)
          .join(' ')
      });
    } else {
      deleted.push('sort');
    }

    if (filter.keyword) {
      queryParams.push({ key: 'search', value: filter.keyword });
      queryParams.push({ key: 'searchBy', value: 'name,uuid' });
    } else {
      deleted.push('search');
      deleted.push('searchBy');
    }

    setParams(queryParams);
    deleted.length > 0 && deleteParams(deleted);
  };

  const handlePageChange = (curPage: number, curPageSize: number) => {
    setParams([
      { key: 'page', value: curPage || 1 },
      { key: 'pageSize', value: curPageSize }
    ]);
  };

  const TableSummary =
    rows.length > 0 || search ? (
      <Typography sx={{ display: 'flex', justifyContent: 'flex-end', w: 1 }} align="right" color="grey.700" fw={500}>
        Tổng số sản phẩm
        {search ? (
          <React.Fragment>
            &nbsp;phù hợp với từ khóa&nbsp;<Typography color="secondary.main">"{search}"</Typography>
          </React.Fragment>
        ) : (
          ''
        )}
        &nbsp;:&nbsp;{total}
      </Typography>
    ) : null;

  return (
    <Table
      keyField="uuid"
      columns={columns}
      rows={rows}
      loading={loading}
      excludeSortFields={['_action', 'photo', 'uuid']}
      onFilter={handleFilterChange}
      autoFilter={false}
      autoPaginate={false}
      searchControl={{
        autoSearch: false,
        fields: ['uuid', 'name'],
        defaultKeyword: search,
        InputProps: { debounceTime: 500 }
      }}
      summary={TableSummary}
      columnFilterControl
      PaginationProps={rows.length > 0 ? { page, pageSize, total, onPageChange: handlePageChange } : {}}
      translation={{
        ...TABLE_TRANSLATION,
        noData: 'Không tìm thấy sản phẩm nào',
        searchPlaceholder: 'Nhập tên hoặc mã sản phẩm'
      }}
    />
  );
};

export default ProductList;
