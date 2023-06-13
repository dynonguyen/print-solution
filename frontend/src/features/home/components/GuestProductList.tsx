import { Flex, Spinner } from '@cads-ui/core';
import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import NoDataFound from '~/components/NoDataFound';
import { useGuestProductListQuery } from '~/graphql/catalog/generated/graphql';
import useQueryPagination from '~/hooks/useQueryPagination';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import ProductItemGuest from './GuestProductItem';

interface GuestProductListProps { }

const GuestProductList = withCatalogApolloProvider<GuestProductListProps>((props) => {
  const { search, setParams } = useQueryPagination();
  const { loading, data } = useGuestProductListQuery({
    variables: { sort: '-createdAt name', search }
  });

  const { docs: products = [] } = data?.products || {};

  const handlePageChange = (newPage: number) => {
    setParams([{ key: 'page', value: newPage }]);
  };
  return (
    <>
      <Typography sx={{ mt: 5, mb: 2 }} color="primary" variant="h5" component="h2">
        ẤN PHẨM PHỔ BIẾN
      </Typography>
      <Box sx={{ m: 2, boxShadow: 2, borderRadius: 2 }}>
        <Box sx={{ p: 2 }}>
          <Grid container>
            {loading ? (
              <Grid item xs={12} sx={{ my: 5 }}>
                <Flex center>
                  <Spinner size="largest" />
                </Flex>
              </Grid>
            ) : (
              <React.Fragment>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Grid key={product.uuid} item xs={12} sm={6} md={4} lg={3} xl={2}>
                      <ProductItemGuest {...product} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <NoDataFound title={<></>} subTitle="Chưa có danh mục sản phẩm nào" />
                  </Grid>
                )}
              </React.Fragment>
            )}
          </Grid>
        </Box>
      </Box>
      <Divider />
    </>
  );
});

export default GuestProductList;
