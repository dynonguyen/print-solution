import { Flex } from '@cads-ui/core';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const ProductImage = () => {
  return (
    <Grid sx={{ p: 2, height: '100vh' }} xs={6}>
      <Flex justifyContent="center">
        <Box
          component="img"
          sx={{
            height: '80%',
            width: '80%',
            border: '12px solid #ccc',
            borderRadius: 2
          }}
          alt="In 2 mặt"
          src="https://thegioiinan.com/hinhanh/general/The_gioi_in_an_general_20190119115615247.jpg"
        />
      </Flex>
    </Grid>
  );
};

export default ProductImage;
