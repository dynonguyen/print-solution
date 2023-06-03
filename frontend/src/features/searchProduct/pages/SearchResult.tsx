import { Box, Container, Grid } from '@cads-ui/core';
import { Navigate, useLocation } from 'react-router-dom';
import { DEFAULTS } from '~/constants/default';
import { PATH } from '~/constants/path';
import { useProductsSearchQuery } from '~/graphql/catalog/generated/graphql';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import CardProduct from "../components/CardProduct";

const SearchResult = withCatalogApolloProvider(() => {
    const search = useLocation().search
    const name = new URLSearchParams(search).get('key')
    const { loading, data } = useProductsSearchQuery({
        variables: {
            "page": null,
            "pageSize": DEFAULTS.PAGE_SIZE,
            "sort": "desc",
            "search": name,
            "searchBy": "name"
        }
    })
    console.log(data)
    const products = data?.products.docs

    if (!products && !loading) {
        return <Navigate to={PATH.NOT_FOUND} />;
    }
    if (products) {
        return (
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        bgcolor: 'background.paper',
                        justifyContent: 'space-between',
                        alignItems: "center",
                    }}
                >
                    {
                        products?.map(product => (
                            <Grid item xs={4} key={product.uuid} sx={{ jutifyContent: "space-between", mb: 2 }}>
                                <CardProduct id={product.uuid} imageURL={product.photo} name={product.name} />
                            </Grid>
                        ))
                    }
                </Box>
            </Container >
        );
    }
    else return (
        loading ?
            <></> :
            <div>
                Không tìm thấy sản phẩm tương ứng
            </div>
    );
});

export default SearchResult