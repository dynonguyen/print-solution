import { Flex } from '@cads-ui/core';
import { Container, Divider, Grid } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { PATH } from '~/constants/path';
import { useProductDetailQuery } from '~/graphql/catalog/generated/graphql';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import ProductDesc from '../components/ProductDesc';
import ProductImage from '../components/ProductImage';
import ProductInfo from '../components/ProductInfo';

// -----------------------------
const ProductDetail = withCatalogApolloProvider((_props) => {
  const param = useParams<{ productId: string }>();
  const { loading, data } = useProductDetailQuery({ variables: { uuid: param.productId ? param.productId : '' } });
  const product = data?.product.doc;

  if (!product && !loading) {
    return <Navigate to={PATH.NOT_FOUND} />;
  }
  if (product)
    return (
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Flex direction="column">
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <ProductImage imgScr={product?.photo} imgAlt={product?.name} />
            </Grid>
            <Grid item md={6} xs={12}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>
          <Divider sx={{ mt: 3 }} />
          <ProductDesc desc={product?.htmlDesc} />
        </Flex>
      </Container>
    );
  else return <></>;
});

export default ProductDetail;
