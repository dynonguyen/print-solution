import { withCatalogApolloProvider } from '~/libs/apollo/catalog';

// -----------------------------
interface AdminProductListProps {}

// -----------------------------
const AdminProductList = withCatalogApolloProvider<AdminProductListProps>((props) => {
  return <>Product list</>;
});

export default AdminProductList;
