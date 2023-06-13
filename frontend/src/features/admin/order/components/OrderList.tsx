import { Table, Typography } from '@cads-ui/core';
import { PaginationProps as CadsPaginationProps } from '@cads-ui/core/components/pagination/PaginationProps';
import { OnFilterValue, TableColumn } from '@cads-ui/core/components/table/TableProps';
import to from 'await-to-js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { TABLE_SORT_TYPE, TABLE_TRANSLATION } from '~/constants/common';
import { DEFAULTS } from '~/constants/default';
import { ENDPOINTS } from '~/constants/endpoints';
import useQueryPagination, { SetQueryParams } from '~/hooks/useQueryPagination';
import orderAxios from '~/libs/axios/order';
import { Order } from '~/types/Order';
import { getTableSortByQuery } from '~/utils/helper';

type DataFetch = {
  orders: {
    docs: Order[];
    total: Number;
  };
};

const OrderList = () => {
  const {
    page,
    pageSize,
    search,
    sort = '',
    searchBy,
    setParams,
    deleteParams
  } = useQueryPagination({
    defaultValues: { pageSize: DEFAULTS.TABLE_PAGE_SIZE, sort: '-createdAt' }
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataFetch>({
    orders: { docs: [], total: 0 }
  });

  const fetchOrders = async () => {
    setLoading(true);
    const [err, rs] = await to(
      orderAxios.get(ENDPOINTS.ORDER_API.GET, {
        params: { id: null, page, pageSize, sort, search, searchBy }
      })
    );
    setData(rs?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [search, searchBy, sort, page, pageSize]);

  const { docs: orders = [], total } = data?.orders || {};

  const columns: TableColumn[] = [
    {
      key: 'uuid',
      title: 'ID'
      // render: (src) => <Avatar src={withMinio(src)} alt={src} shape="square" sx={{ w: 50, h: 50 }} />,
      // renderTdProps: () => ({ style: { minWidth: 100 } })
    },
    { key: 'tel', title: 'SĐT', renderTdProps: () => ({ style: { minWidth: 90 } }) },
    {
      key: 'name',
      title: 'Username',
      maxWidth: 200 // sorter: getTableSortByQuery(sort, 'name')
    },
    {
      key: 'createdBy',
      title: 'User ID',
      maxWidth: 200 // sorter: getTableSortByQuery(sort, 'name')
    },
    {
      key: 'address',
      title: 'Address',
      maxWidth: 200 // sorter: getTableSortByQuery(sort, 'name')
    },
    {
      key: 'status',
      title: 'Status',
      maxWidth: 200 // sorter: getTableSortByQuery(sort, 'name')
    },
    {
      key: 'details',
      title: 'Details',
      maxWidth: 200 // sorter: getTableSortByQuery(sort, 'name')
    },
    {
      key: 'email',
      title: 'Email',
      maxWidth: 200 // sorter: getTableSortByQuery(sort, 'name')
    },
    { key: 'category', title: 'Danh mục', maxWidth: 150, sorter: getTableSortByQuery(sort, 'category') },
    { key: 'product', title: 'Product', maxWidth: 150, sorter: getTableSortByQuery(sort, 'product') },
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
      align: 'right'
      // render: (_, { isHidden, uuid }) => (
      //   <Flex justifyContent="flex-end">
      //     <Tooltip title="Chỉnh sửa" placement="left">
      //       <Link to={`${PATH.ADMIN.PRODUCT.EDIT_ROOT}/${uuid}`}>
      //         <Button isIconBtn color="info">
      //           <Icon icon="material-symbols:edit" />
      //         </Button>
      //       </Link>
      //     </Tooltip>
      //   </Flex>
      // )
    }
  ];

  const rows = orders.map((order, idx) => {
    const { id, ...other } = order;
    return { uuid: id ? id : idx + Date.now() + '', ...other };
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
        &nbsp;:&nbsp;{total + ''}
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
      translation={{
        ...TABLE_TRANSLATION,
        noData: 'Không tìm thấy sản phẩm nào',
        searchPlaceholder: 'Nhập tên hoặc mã sản phẩm'
      }}
      PaginationProps={
        rows.length > 0
          ? ({ page, pageSize, total, onPageChange: handlePageChange } as Partial<CadsPaginationProps>)
          : undefined
      }
    />
  );
};

export default OrderList;
