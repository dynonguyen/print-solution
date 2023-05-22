import { Flex } from '@cads-ui/core';
import { Paper, Typography } from '@mui/material';
import { indigo, red } from '@mui/material/colors';
import { toVND } from '~/utils/helper';

const ProductPrice = ({ price }: any) => {
  return (
    <Paper>
      <Flex direction="row" alignItems="stretch">
        <Typography variant="h6" color={indigo[500]} sx={{ mx: 2, my: 2 }}>
          Thành tiền
        </Typography>
        <Typography variant="h5" color={red[500]} sx={{ mx: 2, my: 2 }}>
          {toVND(price)}
        </Typography>
      </Flex>
    </Paper>
  );
};

export default ProductPrice;
