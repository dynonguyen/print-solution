import { Box, Button, Flex } from '@cads-ui/core';
import { Link } from 'react-router-dom';
import Icon from '~/components/Icon';
import { PATH } from '~/constants/path';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import OrderList from '../components/OrderList';

// -----------------------------
const AdminOrderListPage = withCatalogApolloProvider((props) => {
  return (
    <Box sx={{ h: 'calc(100vh - 76px)' }}>
      <Flex justifyContent="flex-end" sx={{ mb: 8, mt: 5 }}>
        <Link to={PATH.ADMIN.PRODUCT.ADD}>
          <Button fullWidth sm={{ fullWidth: false }} endIcon={<Icon icon="material-symbols:add" />}>
            Thêm sản phẩm mới
          </Button>
        </Link>
      </Flex>
      {/* <Box sx={{ h: 'full', w: 'full', bgColor: 'black' }}>Hi</Box> */}
      <OrderList />
    </Box>
  );
});

export default AdminOrderListPage;
