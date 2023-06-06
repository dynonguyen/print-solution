import { Button, Flex } from '@cads-ui/core';
import { Link } from 'react-router-dom';
import Icon from '~/components/Icon';
import Page from '~/components/Page';
import { PATH } from '~/constants/path';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import ProductList from '../components/ProductList';

// -----------------------------
const AdminProductListPage = withCatalogApolloProvider((props) => {
  return (
    <Page title="Danh sách sản phẩm">
      <Flex justifyContent="flex-end" sx={{ mb: 8, mt: 5 }}>
        <Link to={PATH.ADMIN.PRODUCT.ADD}>
          <Button fullWidth sm={{ fullWidth: false }} endIcon={<Icon icon="material-symbols:add" />}>
            Thêm sản phẩm mới
          </Button>
        </Link>
      </Flex>
      <ProductList />
    </Page>
  );
});

export default AdminProductListPage;
