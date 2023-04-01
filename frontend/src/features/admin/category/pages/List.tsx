import { Box } from '@cads-ui/core';
import React from 'react';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import CategoryList from '../components/CategoryList';
import NewCategory from '../components/NewCategory';

// -----------------------------
interface AdminCategoryListProps {}

// -----------------------------
const AdminCategoryList = withCatalogApolloProvider<AdminCategoryListProps>((props) => {
  return (
    <React.Fragment>
      <Box sx={{ my: 5, mb: 8 }}>
        <NewCategory />
      </Box>
      <CategoryList />
    </React.Fragment>
  );
});

export default AdminCategoryList;
