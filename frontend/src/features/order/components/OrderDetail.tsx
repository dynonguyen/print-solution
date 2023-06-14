import { Flex } from '@cads-ui/core';
import { Cancel, LocalShipping, Payment, Repartition } from '@mui/icons-material';
import { Box, Button, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import moment from 'moment';
import { toVND } from '~/utils/helper';
import OrderDetailItem from './OrderDetailItem';

const OrderDetail = (props: any) => {
  const { OrderStatusIdx, order } = props;
  // const { loading, data } = useProductDetailQuery({ variables: { uuid: order.product } });

  let buttons;
  //các button của từng trạng thái đơn hàng
  switch (OrderStatusIdx) {
    case 2: {
      buttons = (
        <>
          <Button variant="outlined" color="secondary" sx={{ m: 1 }} endIcon={<Cancel />}>
            Hủy đơn hàng
          </Button>
          <Button variant="contained" color="success" sx={{ m: 1 }} endIcon={<Payment />}>
            Thanh Toán
          </Button>
        </>
      );
      break;
    }
    case 4: {
      buttons = (
        <Button variant="outlined" color="secondary" sx={{ m: 1 }} endIcon={<LocalShipping />}>
          Xem quá trình vận chuyển
        </Button>
      );
      break;
    }
    case 3: {
      break;
    }
    case 5: {
      buttons = (
        <Button variant="outlined" color="secondary" sx={{ m: 1 }} endIcon={<Repartition />}>
          Đặt lại
        </Button>
      );
      break;
    }
    default: {
      break;
    }
  }
  // if (loading) {
  //   return <LoadingScreen />;
  // } else {
  // const product = data?.product.doc;
  // const { docs: products = [] } = data?.products || {};
  // const productIdList = order.products.map((product: any) => product._id);
  const createData = (desc: string, value: string) => {
    return { desc, value };
  };
  // // console.log('order: ' + JSON.stringify(order));
  // console.log(productIdList);

  // const productInOrder = products.filter((product) => productIdList.includes(product.uuid));

  const rows = [
    createData('Ngày đặt đơn', moment(order.createdAt).format('HH:SS DD/MM/YYYY')),
    createData('Người nhận', order.name),
    createData('Email', order.email),
    createData('Số điện thoại', order.tel),
    createData('Địa chỉ nhận hàng', order.address)
  ];
  return (
    <>
      <Flex direction="column" spacing={3} sx={{ my: 5, p: 5 }}>
        <Typography variant="h5" color={blue[800]}>
          Đơn hàng {order.displayId}
        </Typography>
        {order.products?.map((item: any) => (
          <OrderDetailItem key={item._id} item={item} />
        ))}
        {/* <OrderDetailItem item={product} order={order} /> */}
        <Flex justifyContent="space-between" wrap>
          <Flex direction="column">
            <TableContainer component={Box}>
              <Table aria-label="infor">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.desc}
                      </TableCell>
                      <TableCell align="left">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex direction="column" spacing={3}>
            <Typography variant="h6" textAlign="right" color={red[500]}>
              {toVND(order?.totalCost || 0)}
            </Typography>
            <Flex justifyContent="flex-end" wrap>
              {buttons}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default OrderDetail;
