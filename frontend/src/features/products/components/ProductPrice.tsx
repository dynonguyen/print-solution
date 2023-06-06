import { Flex } from '@cads-ui/core';
import { Input, InputAdornment, Paper, Typography } from '@mui/material';
import { indigo, red } from '@mui/material/colors';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MAX, MIN } from '~/constants/validation';
import { toVND } from '~/utils/helper';

const calculatePrice = (price: number, amount: number) => {
  return price * amount;
};

const Amount = ({ unit, onChangeAmount }: any) => {
  return (
    <Flex direction="column" sx={{ mb: 5 }}>
      <Typography variant="h6" color={indigo[500]} sx={{ mt: 4 }}>
        Số lượng
      </Typography>
      <Input
        id="amount"
        type="number"
        sx={{ maxWidth: '200px' }}
        endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
        defaultValue={1}
        required
        onChange={onChangeAmount}
        inputProps={{
          type: 'number',
          min: MIN.AMOUNT,
          max: MAX.AMOUNT
        }}
      />
    </Flex>
  );
};

const ProductPrice = ({ price, unit }: any) => {
  const [totalPrice, setTotalPrice] = useState(price);

  const onChangeAmount = (event: React.FormEvent<HTMLInputElement>) => {
    if (Number(event.currentTarget.value) > MAX.AMOUNT) {
      event.currentTarget.value = MAX.AMOUNT.toString();
      toast.warning(`Bạn chỉ có thể in tối đa ${MAX.AMOUNT} ${unit} cho một đơn sản phẩm này`);
    } else if (Number(event.currentTarget.value) < 0) {
      event.currentTarget.value = MIN.AMOUNT.toString();
      toast.warning(`Bạn chỉ có thể in tối thiểu ${MIN.AMOUNT} ${unit} cho một đơn sản phẩm này`);
    }
    setTotalPrice(calculatePrice(price, Number(event.currentTarget.value)));
  };
  return (
    <>
      {price > 0 ? <Amount unit={unit} onChangeAmount={onChangeAmount} /> : ''}
      <Paper>
        <Flex direction="row" alignItems="stretch">
          <Typography variant="h6" color={indigo[500]} sx={{ mx: 2, my: 2 }}>
            Giá
          </Typography>
          <Typography variant="h5" color={red[500]} sx={{ mx: 2, my: 2 }}>
            {price > 0 ? toVND(totalPrice) : 'Liên hệ'}
          </Typography>
        </Flex>
      </Paper>
    </>
  );
};

export default ProductPrice;
