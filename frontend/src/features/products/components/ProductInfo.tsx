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

const ProductInfo = ({ product }: any) => {
  const [amount, setAmount] = useState(1);
  const [selectedValues, setOptions] = useState<String | String[]>('');
  console.log('____selectedValues: ', selectedValues);

  const navigate = useNavigate();

  const handleOrderClick = () => {
    addProductToCart();
    navigate(PATH.GUEST.CART);
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
      cart[existingProductIndex].amount = amount;
    } else {
      cart.push({ ...product, amount: amount });
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    dispatch(increment());
  };

  return (
    <Flex direction="column" alignItems="stretch">
      <Typography variant="h4" color={blue[700]}>
        {product?.name}
      </Typography>
      <Divider />
      {product?.infos.length > 0 ? <ProductParameter sx={{ mt: 4 }} infos={product?.infos} /> : ''}
      {product?.options.length > 0 ? (
        <ProductOptions
          sx={{ mt: 4 }}
          options={product?.options}
          selectedValue={selectedValues}
          setOptions={setOptions}
        />
      ) : (
        ''
      )}
      <ProductPrice sx={{ mt: 4 }} price={product?.price} unit={product?.unit} setAmount={setAmount} />
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          size="medium"
          startIcon={<Icon icon="material-symbols:shopping-cart-outline-rounded" />}
          color="info"
          onClick={addProductToCart}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          variant="contained"
          size="medium"
          startIcon={<Icon icon="material-symbols:shopping-cart-outline-rounded" />}
          sx={{ flexGrow: 1 }}
          color="success"
          onClick={() => {
            addProductToCart();
            navigate(PATH.GUEST.CART);
          }}
        >
          Đặt in ngay
        </Button>
      </Stack>
    </Flex>
  );
};

export default ProductInfo;
