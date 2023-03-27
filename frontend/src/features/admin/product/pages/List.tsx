import { useGetProtectedDemoQuery } from '~/graphql/catalog/generated/graphql';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';

// -----------------------------
interface AdminProductListProps {}

// -----------------------------
const AdminProductList = withCatalogApolloProvider<AdminProductListProps>((props) => {
  const { data, loading, error } = useGetProtectedDemoQuery(); // EXAMPLE: remove it
  console.log(loading, error, data?.protectedDemo);

  return <>Product list</>;
});

export default AdminProductList;
