import { Flex } from '@cads-ui/core';
import { Box, Divider, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import LoadingScreen from '~/components/LoadingScreen';
import { useProductDetailQuery } from '~/graphql/catalog/generated/graphql';
import { toVND } from '~/utils/helper';
import { withMinio } from '~/utils/withStatic';
import ItemDetail from './ItemDetail';

const OrderDetailItem = (props: any) => {
  const [open, setOpen] = useState(false);
  const { item } = props;
  const { loading, data } = useProductDetailQuery({ variables: { uuid: item._id } });
  const product = data?.product.doc;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (!loading)
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
            alt={product?.name}
            src={withMinio(product?.photo || '')}
          />
          <Flex direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{product?.name}</Typography>
            <Typography variant="subtitle1" maxWidth="sm" gutterBottom>
              {item.options}
            </Typography>
            {item.details.length > 0 ? (
              <Typography variant="body1" maxWidth="sm" gutterBottom>
                Ghi chú thêm: {item.details}
              </Typography>
            ) : (
              ''
            )}
            <Typography variant="body2">Số lượng: {item.amount}</Typography>
          </Flex>
          <Typography variant="body1" color={red[500]}>
            {toVND(item.totalCost)}
          </Typography>
        </Flex>
        <Divider />
        <ItemDetail item={item} product={product} handleClose={handleClose} open={open} />
      </>
    );
  else return <LoadingScreen />;
};

export default OrderDetailItem;
