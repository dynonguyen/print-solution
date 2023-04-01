import { Flex, Grid, Pagination, Spinner } from '@cads-ui/core';
import React from 'react';
import NoDataFound from '~/components/NoDataFound';
import { useAdminCategoryListQuery } from '~/graphql/catalog/generated/graphql';
import useQueryPagination from '~/hooks/useQueryPagination';
import CategoryItem from './CategoryItem';

// -----------------------------
const CategoryList: React.FC = () => {
  const { page, pageSize, search, setParams } = useQueryPagination();
  const { loading, data } = useAdminCategoryListQuery({
    variables: { page, pageSize, sort: '-createdAt name', search }
  });

  const { docs: categories = [], total = 0 } = data?.catagories || {};

  const handlePageChange = (newPage: number) => {
    setParams([{ key: 'page', value: newPage }]);
  };

  return (
    <Grid container spacing={8}>
      {loading ? (
        <Grid item xs={12} sx={{ my: 5 }}>
          <Flex center>
            <Spinner size="largest" />
          </Flex>
        </Grid>
      ) : (
        <React.Fragment>
          {categories.length > 0 ? (
            categories.map((catItem) => (
              <Grid key={catItem._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <CategoryItem {...catItem} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <NoDataFound title={<></>} subTitle="Bạn chưa có danh mục sản phẩm nào, hãy thêm ngay" />
            </Grid>
          )}
        </React.Fragment>
      )}

      {!loading && total > 0 && (
        <Grid item xs={12} sx={{ mt: 8 }}>
          <Pagination
            FlexWrapperOptions={{ justifyContent: 'center' }}
            showSizeChanger={false}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            page={page}
            total={total}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CategoryList;
