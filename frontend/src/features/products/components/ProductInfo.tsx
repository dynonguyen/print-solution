import { Flex } from '@cads-ui/core';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '~/components/Icon';
import { PATH } from '~/constants/path';
import { addCartItem } from '~/libs/redux/cartSlice';
import ProductOptions from './ProductOptions';
import ProductParameter from './ProductParameter';
import ProductPrice from './ProductPrice';
import { toast } from 'react-toastify';
import { RootState } from '~/libs/redux/store';

interface ListValues {
  [key: string]: string;
}

const ProductInfo = ({ product }: any) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const [amount, setAmount] = useState(1);
  const [selectedValues, setOptions] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [radioValue, setRadioValue] = useState({});

  const navigate = useNavigate();

  const valueHandle = {
    selectedValues,
    setOptions,
    inputValue,
    setInputValue,
    radioValue,
    setRadioValue
  };

  const isUpdate: Boolean = !!cartItems.find(item => item._id === product._id)

  return (
    <Flex direction="column" alignItems="stretch">
      <Typography variant="h4" color={blue[700]}>
        {product?.name}
      </Typography>
      <Divider />
      {product?.infos.length > 0 ? <ProductParameter sx={{ mt: 4 }} infos={product?.infos} /> : ''}
      {product?.options.length > 0 ? <ProductOptions sx={{ mt: 4 }} options={product?.options} {...valueHandle} /> : ''}
      <ProductPrice sx={{ mt: 4 }} price={product?.price} unit={product?.unit} setAmount={setAmount} />
      <Stack direction={'row'} marginTop={4} spacing={2}>
        <Button
          sx={{ flexGrow: 1, py: 1 }}
          variant="contained"
          size="medium"
          startIcon={<Icon icon="material-symbols:shopping-cart-outline-rounded" />}
          color={isUpdate ? 'warning' : 'info'}
          onClick={() => {
            dispatch(addCartItem({ ...product, amount: +amount, selectedValues, radioValue }))
            // addProductToCart();
            toast(isUpdate ? 'Đã cập nhật giỏ hàng' : 'Đã thêm vào giỏ hàng', { type: 'success' })
          }}
        >
          {isUpdate ? 'Cập nhật giỏ hàng' : 'Thêm vào giỏ hàng'}
        </Button>

        <Button
          variant="contained"
          size="medium"
          sx={{ py: 1 }}
          color="success"
          onClick={() => {
            dispatch(addCartItem({ ...product, amount: +amount, selectedValues, radioValue }))
            navigate(PATH.GUEST.CART)
          }}
        >
          Đặt in ngay
        </Button>
      </Stack>
    </Flex>
  );
};

export default ProductInfo;
