import { Flex } from '@cads-ui/core';
import { Cancel, LocalShipping, Payment, Repartition } from '@mui/icons-material';
import { Button, Divider, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import moment from 'moment';
import { toVND } from '~/utils/helper';
import OrderDetailItem from './OrderDetailItem';

interface OrderItem {
  product: {
    uuid: string;
    name: string;
    image: string;
  };
  options: [
    {
      optionType: string;
      label: string;
      values: string;
    }
  ];
  amount: Number;
  price: Number;
}

const OrderDetail = (props: any) => {
  const { type, order } = props;
  let buttons;
  //các button của từng trạng thái đơn hàng
  switch (type) {
    case 0: {
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
    case 1: {
      break;
    }
    case 2: {
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
    case 4: {
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

  return (
    <>
      <Flex direction="column" spacing={3} sx={{ my: 5, p: 5 }}>
        <Typography variant="h5" color={blue[800]}>
          Đơn hàng {order._id}
        </Typography>
        {order.listProduct.map((item: OrderItem) => (
          <OrderDetailItem key={item.product.uuid} item={item} />
        ))}
        <Flex justifyContent="space-between" wrap>
          <Typography variant="body2">Ngày đặt đơn: {moment(order.createdAt).format('HH:SS DD/MM/YYYY')}</Typography>
          <Flex direction="column" spacing={3}>
            <Typography variant="h6" textAlign="right" color={red[500]}>
              {toVND(order.totalCost)}
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
