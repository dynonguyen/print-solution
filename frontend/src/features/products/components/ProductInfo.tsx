import { Flex } from '@cads-ui/core';
import { Button, Divider, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '~/components/Icon';
import { PATH } from '~/constants/path';
import ProductOptions from './ProductOptions';
import ProductParameter from './ProductParameter';
import ProductPrice from './ProductPrice';

interface ListValues {
  [key: string]: string;
}

// type MultiRefs = Record<string, React.MutableRefObject<string>>;

const ProductInfo = ({ product }: any) => {
  const [amount, setAmount] = useState(1);
  const [selectedValues, setOptions] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [radioValue, setRadioValue] = useState({});

  const navigate = useNavigate();

  // const inputValue: MultiRefs = {};

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

  // const inputValueToString = (obj: MultiRefs) => {
  //   let result = '';
  //   for (const value in obj) result += obj[value].current;
  // };

  const handleOrderClick = () => {
    const queryParams = new URLSearchParams({
      product: product?.uuid,
      amount: String(amount),
      options: `${objToString(radioValue)}, ${objToString(selectedValues)}, ${objToString(inputValue)}`
    }).toString();

    navigate(`${PATH.ORDER.ROOT}?${queryParams}`);
  };

  // console.log(`inputValue: ${JSON.stringify(inputValue)}`);

  // if (product?.options.length > 0) {
  //   console.log(product.options);

  //   for (const idx in product.options) {
  //     if (product.options[idx].optionType === PRODUCT_OPTION_TYPES.INPUT) {
  //       console.log('===');
  //       // inputValue[product.options[idx].label] = useRef('');
  //       inputValue['aaaa'] = useRef('jádak');
  //     }
  //   }
  // }

  return (
    <Flex direction="column" alignItems="stretch">
      <Typography variant="h4" color={blue[700]}>
        {product?.name}
      </Typography>
      <Divider />
      {product?.infos.length > 0 ? <ProductParameter sx={{ mt: 4 }} infos={product?.infos} /> : ''}
      {product?.options.length > 0 ? <ProductOptions sx={{ mt: 4 }} options={product?.options} {...valueHandle} /> : ''}
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
