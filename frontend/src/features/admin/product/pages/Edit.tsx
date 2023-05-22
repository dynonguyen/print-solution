import { Container, Typography } from '@cads-ui/core';
import { omit } from 'lodash';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Page from '~/components/Page';
import { PATH } from '~/constants/path';
import { useAdminProductToEditQuery } from '~/graphql/catalog/generated/graphql';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import { Product } from '~/types/Product';
import ProductForm from '../components/ProductForm';

// -----------------------------
interface NewProductProps {}

// -----------------------------
const AdminEditProductPage: React.FC<NewProductProps> = withCatalogApolloProvider((props) => {
  const { uuid = '' } = useParams<{ uuid: string }>();
  const { loading, data } = useAdminProductToEditQuery({ variables: { uuid }, fetchPolicy: 'no-cache' });

  if (!loading && !data?.product.doc?._id) {
    return <Navigate to={PATH.NOT_FOUND} />;
  }

  const removeTypeName = () => {
    const product: Product = omit(data?.product.doc, '__typename') as Product;
    product.infos = product.infos?.map((info) => omit(info, '__typename'));
    product.options = product.options?.map((o) => omit(o, '__typename'));
    return product;
  };

  return loading ? null : (
    <Page title={`Cập nhật sản phẩm ${uuid}`}>
      <Container maxWidth="lg">
        <Typography variant="h4" transform="uppercase" sx={{ mb: 8 }} color="primary.main">
          Cập nhật sản phẩm #{uuid}
        </Typography>
        <ProductForm isEdit={true} editedProduct={removeTypeName()} />
      </Container>
    </Page>
  );
});

export default AdminEditProductPage;
