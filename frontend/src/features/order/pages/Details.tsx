import { Container, Typography } from '@mui/material';
import to from 'await-to-js';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '~/constants/endpoints';
import { useGuestCategoryListQuery, useGuestProductListQuery } from '~/graphql/catalog/generated/graphql';
import useQueryPagination from '~/hooks/useQueryPagination';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';
import orderAxios from '~/libs/axios/order';
import { Order } from '~/types/Order';

// -----------------------------
interface OrderDetailsProps { }

// -----------------------------
const OrderDetails: React.FC<OrderDetailsProps> = withCatalogApolloProvider((props) => {
  const location = useLocation();

  const { data: dataCategory } = useGuestCategoryListQuery({ variables: { page: 1, pageSize: 1000, sort: 'name' } });
  const { search, setParams } = useQueryPagination();
  const navigate = useNavigate();

  const { data: dataProductList } = useGuestProductListQuery({
    variables: { sort: '-createdAt name' }
  });

  const PRODUCT_LIST = dataProductList?.products?.docs;
  const CATEGORY_LIST = dataCategory?.catagories?.docs;

  const [data, setData] = useState<Order | Order[]>();
  const [loadingFetchOrder, setLoadingFetchOrder] = useState(false);

  const fetchOrders = async (params: any = {}) => {
    setLoadingFetchOrder(true);
    const [err, rs] = await to(
      orderAxios.get(ENDPOINTS.ORDER_API.GET, {
        params
      })
    );
    console.log('____err, rs: ', err, rs);

    setData(rs?.data);
    setLoadingFetchOrder(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    fetchOrders({ id });
  }, [location.search]);

  return (
    <Container sx={{ minHeight: 'calc(100vh - 196px)', py: 5, px: 0 }}>
      {/* <Uploader /> */}
      <Typography variant="h4" align="center" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
        Chi tiết đơn hàng
      </Typography>
      {/* <Typography variant="h5" mt={3} mb={2}>
        Tải lên tài liệu
      </Typography> */}
      {/* <Typography variant="h5" mt={3} mb={2}>
        Thể loại in
      </Typography>
      <Typography variant="h5" mb={2}>
        Quy cách in
      </Typography>
      <TextField
        id="details"
        value={formValues.details} onChange={handleInputChange}
        placeholder="Mô tả quy cách in tài liệu"
        multiline
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <Typography variant="h5" mb={2}>
        Thông tin khách hàng
      </Typography>
      <Grid container style={{ marginBottom: '1rem' }} spacing={2}>
        <Grid item xs={6}>
          <TextField error={error.field === 'tel'} type='number' required id="tel" label="Số điện thoại liên hệ" fullWidth value={formValues.tel} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField required id="email" label="Địa chỉ email (Nhận báo giá)" fullWidth value={formValues.email} onChange={handleInputChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField id="name" label="Tên của bạn" fullWidth value={formValues.name} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField id="address" label="Địa chỉ giao hàng" fullWidth value={formValues.address} onChange={handleInputChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={100} marginTop={5}>
        <Grid item xs={4}>
          <Button onClick={handlePreview} style={{ width: '100%' }} variant="outlined">
            Xem trước đơn hàng
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button style={{ width: '100%' }} variant="contained" type='submit'>
            Đặt in ngay
          </Button>
        </Grid>
      </Grid> */}
    </Container>
  );
});

export default OrderDetails;
