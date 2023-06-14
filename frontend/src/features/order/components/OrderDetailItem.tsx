import { Flex } from '@cads-ui/core';
import { Box, Divider, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { toVND } from '~/utils/helper';
import { withMinio } from '~/utils/withStatic';
import ItemDetail from './ItemDetail';

const OrderDetailItem = (props: any) => {
  const [open, setOpen] = useState(false);
  const { item, order } = props;
  let optionsString = '';

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Flex
        onClick={handleClickOpen}
        alignItems="center"
        justifyContent="space-between"
        sx={{ cursor: 'pointer' }}
        wrap
      >
        <Box
          component="img"
          sx={{
            height: '100px',
            width: '100px',
            objectFit: 'contain',
            border: '1px solid #ccc',
            borderRadius: 2,
            alignItems: 'center',
            mr: 2
          }}
          alt={item.name}
          src={withMinio(item.photo)}
        />
        <Flex direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="subtitle1" maxWidth="sm" gutterBottom>
            {order.options}
          </Typography>
          <Typography variant="body2">Số lượng: {order.amount}</Typography>
        </Flex>
        <Typography variant="body1" color={red[500]}>
          {toVND(item.price)}
        </Typography>
      </Flex>
      <Divider />
      <ItemDetail item={item} order={order} handleClose={handleClose} open={open} />
    </>
  );
};

export default OrderDetailItem;
