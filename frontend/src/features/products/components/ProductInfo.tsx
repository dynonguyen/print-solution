import { Flex } from '@cads-ui/core';
import { Button, Divider, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Icon from '~/components/Icon';
import ProductOptions from './ProductOptions';
import ProductParameter from './ProductParameter';
import ProductPrice from './ProductPrice';

const ProductInfo = ({ product }: any) => {
  return (
    <Flex direction="column" alignItems="stretch">
      <Typography variant="h4" color={blue[700]}>
        {product?.name}
      </Typography>
      <Divider />
      {product?.infos.length > 0 ? <ProductParameter infos={product?.infos} /> : ''}
      {product?.options.length > 0 ? <ProductOptions options={product?.options} /> : ''}
      <ProductPrice price={product?.price} unit={product?.unit} />
      <Button
        variant="contained"
        size="large"
        startIcon={<Icon icon="material-symbols:shopping-cart-outline-rounded" />}
        sx={{ py: 2 }}
        color="success"
      >
        Đặt in ngay
      </Button>
    </Flex>
  );
};

export default ProductInfo;
