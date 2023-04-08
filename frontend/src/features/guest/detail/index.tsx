import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Page from '~/components/Page';
import ProductDetail from './components/ProductDetail';
import ProductImage from './components/ProductImage';

const GuestProductDetail = () => {
  return (
    <Page title="Chi tiết sản phẩm">
      <Grid container spacing={2}>
        <ProductImage />
        <ProductDetail />
      </Grid>
    </Page>
  );
};

export default GuestProductDetail;
