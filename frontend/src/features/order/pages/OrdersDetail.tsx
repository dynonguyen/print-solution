import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import NoDataFound from '~/components/NoDataFound';
import { ORDER_STATUS } from '~/constants/common';
import OrderDetail from '../components/OrderDetail';
import { ORDERS } from '../components/data';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const OrdersDetail = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //-----------USERID-----------//
  const userId = 'thisIsTheUserId';

  //----------ORDER-----------//
  const userOrders = ORDERS.filter((order) => order.userId === userId);
  const waitingOrders = userOrders.filter((order) => order.status === ORDER_STATUS.WAITING);
  const confirmedOrders = userOrders.filter((order) => order.status === ORDER_STATUS.CONFIRMED);
  const shippingOrders = userOrders.filter((order) => order.status === ORDER_STATUS.SHIPPING);
  const completedOrders = userOrders.filter((order) => order.status === ORDER_STATUS.COMPLETED);
  const canceledOrders = userOrders.filter((order) => order.status === ORDER_STATUS.CANCELED);

  return (
    <Paper sx={{ my: 4, mx: 4, minHeight: 'calc(100vh - 260px)' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Trạng thái đơn hàng" variant="fullWidth">
            <Tab label="Chờ thanh toán" {...a11yProps(0)} />
            <Tab label="Đã xác nhận" {...a11yProps(1)} />
            <Tab label="Đang giao" {...a11yProps(2)} />
            <Tab label="Hoàn thành" {...a11yProps(3)} />
            <Tab label="Đã hủy" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box>
            {waitingOrders.length > 0 ? (
              waitingOrders.map((order) => <OrderDetail key={order._id} type={0} order={order} />)
            ) : (
              <NoDataFound title={<></>} subTitle="Chưa có đơn hàng nào" />
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            {confirmedOrders.length > 0 ? (
              confirmedOrders.map((order) => <OrderDetail key={order._id} type={1} order={order} />)
            ) : (
              <NoDataFound title={<></>} subTitle="Chưa có đơn hàng nào" />
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>
            {shippingOrders.length > 0 ? (
              shippingOrders.map((order) => <OrderDetail key={order._id} type={2} order={order} />)
            ) : (
              <NoDataFound title={<></>} subTitle="Chưa có đơn hàng nào" />
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box>
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => <OrderDetail key={order._id} type={3} order={order} />)
            ) : (
              <NoDataFound title={<></>} subTitle="Chưa có đơn hàng nào" />
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Box>
            {canceledOrders.length > 0 ? (
              canceledOrders.map((order) => <OrderDetail key={order._id} type={4} order={order} />)
            ) : (
              <NoDataFound title={<></>} subTitle="Chưa có đơn hàng nào" />
            )}
          </Box>
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default OrdersDetail;
