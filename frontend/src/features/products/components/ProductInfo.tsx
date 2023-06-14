import { Flex } from '@cads-ui/core';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from '~/components/Icon';
import { PATH } from '~/constants/path';
import { increment } from '~/libs/redux/cardSlice';
import ProductOptions from './ProductOptions';
import ProductParameter from './ProductParameter';
import ProductPrice from './ProductPrice';
import { toast } from 'react-toastify';

interface ListValues {
  [key: string]: string;
}

const ProductInfo = ({ product }: any) => {
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

  const objToString = (obj: ListValues) => {
    let result = '';
    for (const item in obj) {
      result += `${item}: ${obj[item].toString()}. `;
    }
    return result;
  };

  const handleOrderClick = () => {
    const queryParams = new URLSearchParams({
      product: product?.uuid,
      amount: String(amount),
      options: `${Object.keys(radioValue).length > 0 ? objToString(radioValue) : ''}${Object.keys(selectedValues).length > 0 ? objToString(selectedValues) : ''
        }${Object.keys(inputValue).length > 0 ? objToString(inputValue) : ''}`
    }).toString();
    navigate(`${PATH.ORDER.ROOT}?${queryParams}`);
  };

  const dispatch = useDispatch();

  const addProductToCart = () => {
    let localCart = localStorage.getItem('cart');
    let cart: Array<any> = [];
    if (localCart) {
      cart = JSON.parse(localCart);
    }
    const existingProductIndex = cart.findIndex((productInCart) => product._id === productInCart._id);
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].amount += amount;
    } else {
      cart.push({ ...product, amount: amount });
      dispatch(increment());
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
  };

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
          color="info"
          onClick={() => {
            addProductToCart();
            toast('Đã thêm vào giỏ hàng')
          }}
        >
          Thêm vào giỏ hàng
        </Button>

        <Button
          href={PATH.GUEST.CART}
          variant="contained"
          size="medium"
          sx={{ py: 1 }}
          color="success"
        >
          Đặt in ngay
        </Button>
      </Stack>
    </Flex>
  );
};

export default ProductInfo;
