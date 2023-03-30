import { Typography } from '@cads-ui/core';
import React from 'react';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import NewCategory from '../components/NewCategory';

// -----------------------------
interface AdminCategoryListProps {}

// -----------------------------
const AdminCategoryList = withCatalogApolloProvider<AdminCategoryListProps>((props) => {
  return (
    <React.Fragment>
      <NewCategory />
      <Typography variant="h3">Danh mục sản phẩm</Typography>
    </React.Fragment>
  );
});

export default AdminCategoryList;
