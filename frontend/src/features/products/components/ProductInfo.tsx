import { useState } from 'react'
import { Flex } from '@cads-ui/core';
import { Button, Divider, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Icon from '~/components/Icon';
import ProductOptions from './ProductOptions';
import ProductParameter from './ProductParameter';
import ProductPrice from './ProductPrice';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';

const ProductInfo = ({ product }: any) => {
  const [amount, setAmount] = useState(1)
  const [selectedValues, setOptions] = useState<String | String[]>("")

  const navigate = useNavigate();

  const handleOrderClick = () => {
    const queryParams = new URLSearchParams({
      product: product?._id,
      amount: String(amount),
      options: selectedValues.toString()
    }).toString();

    navigate(`${PATH.ORDER.ROOT}?${queryParams}`);
  };

  return (
    <Flex direction="column" alignItems="stretch">
      <Typography variant="h4" color={blue[700]}>
        {product?.name}
      </Typography>
      <Divider />
      {product?.infos.length > 0 ? <ProductParameter sx={{ mt: 4 }} infos={product?.infos} /> : ''}
      {product?.options.length > 0 ? <ProductOptions sx={{ mt: 4 }} options={product?.options} selectedValue={selectedValues} setOptions={setOptions} /> : ''}
      <ProductPrice sx={{ mt: 4 }} price={product?.price} unit={product?.unit} setAmount={setAmount} />
      <Button
        variant="contained"
        size="large"
        startIcon={<Icon icon="material-symbols:shopping-cart-outline-rounded" />}
        sx={{ py: 2, mt: 4 }}
        color="success"
        onClick={handleOrderClick}
      >
        Đặt in ngay
      </Button>
    </Flex>
  );
};

export default ProductInfo;
