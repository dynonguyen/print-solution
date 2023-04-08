import { Flex, Typography } from '@cads-ui/core';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const ProductDetail = () => {
  return (
    <Grid sx={{ p: 2, height: '100vh' }} xs={6}>
      {/*TODO: UI thông tin sản phẩm */}
      <Flex sx={{ bgColor: '#ccc', height: '100%', width: '80%' }}>
        <Typography sx={{ p: 4 }}>Thông tin sản phẩm</Typography>
      </Flex>
    </Grid>
  );
};

export default ProductDetail;
