import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NoDataFound from '~/components/NoDataFound';
import { ORDER_STATUS } from '~/constants/common';
import OrderDetail from '../components/OrderDetail';
import { ORDERS } from '../components/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGuestCategoryListQuery, useGuestProductListQuery } from '~/graphql/catalog/generated/graphql';
import useQueryPagination from '~/hooks/useQueryPagination';
import { Order } from '~/types/Order';
import orderAxios from '~/libs/axios/order';
import { ENDPOINTS } from '~/constants/endpoints';
import to from 'await-to-js';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import { CUSTOM_PRODUCT } from '~/types/Product';
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

interface OrderDetailsProps { }

const OrdersDetail: React.FC<OrderDetailsProps> = withCatalogApolloProvider((props) => {
  // Start: Handle fetch api get order:
  const location = useLocation();

  const { data: dataCategory } = useGuestCategoryListQuery({ variables: { page: 1, pageSize: 1000, sort: 'name' } });
  const { search, setParams } = useQueryPagination();
  const navigate = useNavigate();

  const { data: dataProductList } = useGuestProductListQuery({
    variables: { sort: '-createdAt name' },
  });

  const productList = dataProductList?.products?.docs;
  const PRODUCT_LIST = productList ? [...productList, CUSTOM_PRODUCT] : [CUSTOM_PRODUCT];
  const CATEGORY_LIST = dataCategory?.catagories?.docs

  const [data, setData] = useState<Order[]>()
  const [loadingFetchOrder, setLoadingFetchOrder] = useState(false)

  const fetchOrders = async (params: any = {}) => {
    setLoadingFetchOrder(true);
    const [err, rs] = await to(
      orderAxios.get(ENDPOINTS.ORDER_API.GET, {
        params
      })
    );
    console.log("____err, rs: ", rs?.data?.orders?.docs);

    setData(rs?.data?.orders?.docs);
    setLoadingFetchOrder(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const displayId = searchParams.get('display_id')
    fetchOrders({ id, displayId });
  }, [location.search]);
  // End: Handle fetch api get order:

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //-----------USERID-----------//

  const LIST_TABS = Object.keys(ORDER_STATUS).map(key => (
    { id: key, label: ORDER_STATUS[key].name }
  ))

  return (
    <Paper sx={{ my: 4, mx: 4, minHeight: 'calc(100vh - 260px)' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Trạng thái đơn hàng" variant="fullWidth">
            {LIST_TABS.map((tab, idx) => (<Tab key={tab.id} label={tab.label} {...a11yProps(idx)} />))}
          </Tabs>
        </Box>
        {LIST_TABS.map((tab, idx) => {
          const tabOrders = data ? data.filter(order => order.status === tab.id) : []
          return (
            <TabPanel key={tab.id} value={value} index={idx}>
              <Box>
                {tabOrders.length > 0 ? (
                  tabOrders.map((order) => <OrderDetail key={order.id} type={0} order={order} />)
                ) : (
                  <NoDataFound title={<></>} subTitle="Chưa có đơn hàng nào" />
                )}
              </Box>
            </TabPanel>
          )
        })}
      </Box>
    </Paper>
  );
})

export default OrdersDetail;
